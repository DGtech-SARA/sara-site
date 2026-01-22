import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { vendedorId } = await request.json();

    // Buscar dados do vendedor
    const { data: vendedor, error: vendedorError } = await supabase
      .from("vendedores")
      .select("*")
      .eq("id", vendedorId)
      .single();

    if (vendedorError || !vendedor) {
      return NextResponse.json(
        { error: "Vendedor não encontrado" },
        { status: 404 },
      );
    }

    // Gerar código único
    const primeiroNome = vendedor.nome.split(" ")[0].toUpperCase();
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    const codigoUnico = `${primeiroNome}${numeroAleatorio}`;

    // Criar subconta no Asaas
    const responseAsaas = await fetch("https://www.asaas.com/api/v3/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify({
        name: vendedor.nome,
        email: vendedor.email,
        cpfCnpj: vendedor.cnpj_mei,
        companyType: "MEI",
        phone: vendedor.telefone,
        mobilePhone: vendedor.telefone,
        address: vendedor.rua,
        addressNumber: vendedor.numero,
        complement: vendedor.complemento || "",
        province: vendedor.bairro,
        postalCode: vendedor.cep.replace(/\D/g, ""),
        birthDate: vendedor.data_nascimento || null,
      }),
    });

    const dataAsaas = await responseAsaas.json();

    if (!responseAsaas.ok) {
      console.error("❌ Erro Asaas:", dataAsaas);
      return NextResponse.json(
        {
          error:
            dataAsaas.errors?.[0]?.description ||
            "Erro ao criar subconta no Asaas",
        },
        { status: 400 },
      );
    }

    // Gerar link de indicação
    const linkIndicacao = `${process.env.NEXT_PUBLIC_SITE_URL}/?ref=${codigoUnico}`;

    // Atualizar vendedor no banco
    const { error: updateError } = await supabase
      .from("vendedores")
      .update({
        wallet_id_asaas: dataAsaas.walletId,
        asaas_account_id: dataAsaas.id,
        codigo_unico: codigoUnico,
        link_indicacao: linkIndicacao,
        status: "ativo",
      })
      .eq("id", vendedorId);

    if (updateError) {
      console.error("❌ Erro ao atualizar vendedor:", updateError);
      return NextResponse.json(
        { error: "Erro ao atualizar vendedor no banco" },
        { status: 500 },
      );
    }

    // Enviar email de aprovação
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/email/vendedor-aprovado`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: vendedor.email,
          nome: vendedor.nome,
          linkIndicacao,
          codigoUnico,
        }),
      },
    );

    return NextResponse.json({
      success: true,
      walletId: dataAsaas.walletId,
      codigoUnico,
      linkIndicacao,
    });
  } catch (error) {
    console.error("❌ Erro ao criar subconta:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
