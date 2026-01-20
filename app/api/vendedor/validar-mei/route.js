import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { cnpj } = await request.json();

    if (!cnpj) {
      return NextResponse.json({ erro: "CNPJ não informado" }, { status: 400 });
    }

    // Limpar CNPJ (remover pontos, barras, etc)
    const cnpjLimpo = cnpj.replace(/\D/g, "");

    if (cnpjLimpo.length !== 14) {
      return NextResponse.json(
        {
          valido: false,
          motivo: "CNPJ inválido. Deve conter 14 dígitos.",
        },
        { status: 200 },
      );
    }

    // Consultar API da Receita Federal
    // NOTA: Esta é uma API pública, mas pode ter limitações de uso
    try {
      const response = await fetch(
        `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`,
      );

      if (!response.ok) {
        throw new Error("Erro ao consultar CNPJ");
      }

      const dados = await response.json();

      // Verificar se retornou erro
      if (dados.status === "ERROR") {
        return NextResponse.json(
          {
            valido: false,
            motivo: dados.message || "CNPJ não encontrado na Receita Federal",
          },
          { status: 200 },
        );
      }

      // Verificar se é MEI
      const isMEI =
        dados.natureza_juridica === "213-5" ||
        dados.porte === "ME" ||
        dados.nome?.includes("MEI");

      if (!isMEI) {
        return NextResponse.json(
          {
            valido: false,
            motivo:
              "Este CNPJ não é um MEI (Microempreendedor Individual). Apenas MEIs podem se cadastrar como vendedores.",
          },
          { status: 200 },
        );
      }

      // Verificar situação cadastral
      if (dados.situacao !== "ATIVA") {
        return NextResponse.json(
          {
            valido: false,
            motivo: `MEI com situação cadastral: ${dados.situacao}. Apenas MEIs ativos podem se cadastrar.`,
          },
          { status: 200 },
        );
      }

      // MEI válido!
      return NextResponse.json({
        valido: true,
        dados: {
          cnpj: dados.cnpj,
          razao_social: dados.nome,
          nome_fantasia: dados.fantasia || dados.nome,
          data_abertura: dados.abertura,
          situacao: dados.situacao,
          atividade_principal: dados.atividade_principal?.[0]?.text || "",
          endereco: {
            cep: dados.cep?.replace(/\D/g, ""),
            rua: dados.logradouro,
            numero: dados.numero,
            complemento: dados.complemento,
            bairro: dados.bairro,
            cidade: dados.municipio,
            estado: dados.uf,
          },
        },
      });
    } catch (apiError) {
      console.error("Erro ao consultar API:", apiError);

      // Se a API falhar, permitir cadastro manual
      return NextResponse.json(
        {
          valido: false,
          motivo:
            "Não foi possível validar o MEI automaticamente. Verifique se o CNPJ está correto e tente novamente.",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Erro na validação:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
