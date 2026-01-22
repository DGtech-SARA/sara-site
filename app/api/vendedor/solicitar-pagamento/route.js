import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { vendedorId, mesReferencia, notaFiscalUrl } = await request.json();

    // Buscar comissões pendentes do mês
    const { data: comissoes, error: comissoesError } = await supabase
      .from("comissoes")
      .select("*")
      .eq("vendedor_id", vendedorId)
      .eq("mes_referencia", mesReferencia)
      .eq("status", "pendente");

    if (comissoesError || !comissoes || comissoes.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma comissão pendente encontrada" },
        { status: 404 },
      );
    }

    const valorTotal = comissoes.reduce(
      (sum, c) => sum + parseFloat(c.valor),
      0,
    );
    const quantidadeClientes = comissoes.length;

    // Criar solicitação de pagamento
    const { data: solicitacao, error: solicitacaoError } = await supabase
      .from("solicitacoes_pagamento")
      .insert([
        {
          vendedor_id: vendedorId,
          mes_referencia: mesReferencia,
          valor_total: valorTotal,
          quantidade_clientes: quantidadeClientes,
          nota_fiscal_url: notaFiscalUrl,
          status: "pendente",
        },
      ])
      .select()
      .single();

    if (solicitacaoError) {
      console.error("❌ Erro ao criar solicitação:", solicitacaoError);
      return NextResponse.json(
        { error: "Erro ao criar solicitação de pagamento" },
        { status: 500 },
      );
    }

    // Atualizar status das comissões
    await supabase
      .from("comissoes")
      .update({
        status: "aguardando_nf",
        data_solicitacao_vendedor: new Date().toISOString(),
      })
      .eq("vendedor_id", vendedorId)
      .eq("mes_referencia", mesReferencia)
      .eq("status", "pendente");

    return NextResponse.json({
      success: true,
      solicitacao,
    });
  } catch (error) {
    console.error("❌ Erro ao solicitar pagamento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
