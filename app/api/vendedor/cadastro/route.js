import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function POST(request) {
  try {
    const dados = await request.json();

    // Validar campos obrigatórios
    const camposObrigatorios = [
      "nome",
      "email",
      "telefone",
      "cpf",
      "cnpj_mei",
      "razao_social_mei",
      "comprovante_mei_url",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];

    for (const campo of camposObrigatorios) {
      if (!dados[campo]) {
        return NextResponse.json(
          { erro: `Campo obrigatório: ${campo}` },
          { status: 400 },
        );
      }
    }

    // Verificar se já existe vendedor com mesmo email, CPF ou CNPJ
    const { data: existente, error: erroVerificacao } = await supabase
      .from("vendedores")
      .select("id, email, cpf, cnpj_mei")
      .or(
        `email.eq.${dados.email},cpf.eq.${dados.cpf},cnpj_mei.eq.${dados.cnpj_mei}`,
      )
      .single();

    if (existente) {
      if (existente.email === dados.email) {
        return NextResponse.json(
          { erro: "Email já cadastrado" },
          { status: 400 },
        );
      }
      if (existente.cpf === dados.cpf) {
        return NextResponse.json(
          { erro: "CPF já cadastrado" },
          { status: 400 },
        );
      }
      if (existente.cnpj_mei === dados.cnpj_mei) {
        return NextResponse.json(
          { erro: "CNPJ MEI já cadastrado" },
          { status: 400 },
        );
      }
    }

    // Inserir vendedor no banco
    const { data: vendedor, error: erroInsercao } = await supabase
      .from("vendedores")
      .insert([
        {
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          cpf: dados.cpf,
          data_nascimento: dados.data_nascimento || null,
          cnpj_mei: dados.cnpj_mei,
          razao_social_mei: dados.razao_social_mei,
          nome_fantasia_mei: dados.nome_fantasia_mei || null,
          data_abertura_mei: dados.data_abertura_mei || null,
          situacao_mei: dados.situacao_mei || null,
          atividade_principal_mei: dados.atividade_principal_mei || null,
          comprovante_mei_url: dados.comprovante_mei_url,
          cep: dados.cep,
          rua: dados.rua,
          numero: dados.numero,
          complemento: dados.complemento || null,
          bairro: dados.bairro,
          cidade: dados.cidade,
          estado: dados.estado,
          status: "pendente",
        },
      ])
      .select()
      .single();

    if (erroInsercao) {
      console.error("Erro ao inserir vendedor:", erroInsercao);
      return NextResponse.json(
        { erro: "Erro ao cadastrar vendedor" },
        { status: 500 },
      );
    }

    // Enviar email para D&G Sistemas
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/email/novo-vendedor`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vendedor_id: vendedor.id,
            nome: vendedor.nome,
            email: vendedor.email,
            cnpj_mei: vendedor.cnpj_mei,
          }),
        },
      );
    } catch (erroEmail) {
      console.error("Erro ao enviar email:", erroEmail);
      // Não retornar erro, pois o cadastro foi feito com sucesso
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Cadastro realizado com sucesso! Aguarde aprovação.",
      vendedor_id: vendedor.id,
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
