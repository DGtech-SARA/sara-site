import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { solicitacaoId } = await request.json();

    // Buscar solicitação
    const { data: solicitacao, error: solicitacaoError } = await supabase
      .from("solicitacoes_pagamento")
      .select("*")
      .eq("id", solicitacaoId)
      .single();

    if (solicitacaoError || !solicitacao) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 },
      );
    }

    // Atualizar status da solicitação
    await supabase
      .from("solicitacoes_pagamento")
      .update({
        status: "paga",
        updated_at: new Date().toISOString(),
      })
      .eq("id", solicitacaoId);

    // Atualizar comissões relacionadas
    await supabase
      .from("comissoes")
      .update({
        status: "paga",
        data_pagamento_vendedor: new Date().toISOString(),
      })
      .eq("vendedor_id", solicitacao.vendedor_id)
      .eq("mes_referencia", solicitacao.mes_referencia)
      .eq("status", "aguardando_nf");

    // Atualizar total ganho do vendedor
    const { data: vendedor } = await supabase
      .from("vendedores")
      .select("total_ganho")
      .eq("id", solicitacao.vendedor_id)
      .single();

    await supabase
      .from("vendedores")
      .update({
        total_ganho:
          (parseFloat(vendedor.total_ganho) || 0) +
          parseFloat(solicitacao.valor_total),
      })
      .eq("id", solicitacao.vendedor_id);

    // Buscar email do vendedor
    const { data: vendedorData } = await supabase
      .from("vendedores")
      .select("email, nome")
      .eq("id", solicitacao.vendedor_id)
      .single();

    // Enviar email de confirmação
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/email/pagamento-confirmado`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: vendedorData.email,
          nome: vendedorData.nome,
          valor: solicitacao.valor_total,
          mesReferencia: solicitacao.mes_referencia,
        }),
      },
    );

    return NextResponse.json({
      success: true,
      message: "Pagamento aprovado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao aprovar pagamento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
