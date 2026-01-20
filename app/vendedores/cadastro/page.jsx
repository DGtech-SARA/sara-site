import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const dados = await request.json();

    // Validações
    if (!dados.nome || !dados.email || !dados.telefone || !dados.cpf) {
      return NextResponse.json(
        { erro: "Dados pessoais incompletos" },
        { status: 400 },
      );
    }

    if (!dados.cnpj_mei || !dados.comprovante_mei_url) {
      return NextResponse.json(
        { erro: "Dados do MEI incompletos" },
        { status: 400 },
      );
    }

    if (
      !dados.cep ||
      !dados.rua ||
      !dados.numero ||
      !dados.bairro ||
      !dados.cidade ||
      !dados.estado
    ) {
      return NextResponse.json(
        { erro: "Endereço incompleto" },
        { status: 400 },
      );
    }

    // Verificar se email já existe
    const { data: emailExiste } = await supabase
      .from("vendedores")
      .select("id")
      .eq("email", dados.email)
      .single();

    if (emailExiste) {
      return NextResponse.json(
        { erro: "Este email já está cadastrado" },
        { status: 400 },
      );
    }

    // Verificar se CNPJ já existe
    const { data: cnpjExiste } = await supabase
      .from("vendedores")
      .select("id")
      .eq("cnpj_mei", dados.cnpj_mei)
      .single();

    if (cnpjExiste) {
      return NextResponse.json(
        { erro: "Este CNPJ já está cadastrado" },
        { status: 400 },
      );
    }

    // Criar vendedor
    const { data: vendedor, error } = await supabase
      .from("vendedores")
      .insert([
        {
          // Dados Pessoais
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          cpf: dados.cpf,
          data_nascimento: dados.data_nascimento || null,

          // MEI
          cnpj_mei: dados.cnpj_mei,
          razao_social_mei: dados.razao_social_mei,
          nome_fantasia_mei: dados.nome_fantasia_mei,
          data_abertura_mei: dados.data_abertura_mei,
          situacao_mei: dados.situacao_mei,
          atividade_principal_mei: dados.atividade_principal_mei,
          comprovante_mei_url: dados.comprovante_mei_url,

          // Endereço
          cep: dados.cep,
          rua: dados.rua,
          numero: dados.numero,
          complemento: dados.complemento || null,
          bairro: dados.bairro,
          cidade: dados.cidade,
          estado: dados.estado,

          // Status
          status: "pendente",
          data_cadastro: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Erro ao criar vendedor:", error);
      return NextResponse.json(
        { erro: "Erro ao criar vendedor" },
        { status: 500 },
      );
    }

    // Enviar email para D&G Sistemas notificando novo cadastro
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
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
      // Não bloquear o cadastro se o email falhar
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Cadastro realizado com sucesso! Aguarde a aprovação.",
      vendedor_id: vendedor.id,
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
