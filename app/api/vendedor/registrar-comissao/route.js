import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { clienteId, valorPago } = await request.json();

    // Buscar dados do cliente
    const { data: cliente, error: clienteError } = await supabase
      .from("usuarios")
      .select("indicado_por")
      .eq("id", clienteId)
      .single();

    if (clienteError || !cliente || !cliente.indicado_por) {
      return NextResponse.json({
        success: false,
        message: "Cliente não tem indicação",
      });
    }

    // Buscar vendedor
    const { data: vendedor, error: vendedorError } = await supabase
      .from("vendedores")
      .select("id, status")
      .eq("codigo_unico", cliente.indicado_por)
      .single();

    if (vendedorError || !vendedor || vendedor.status !== "ativo") {
      return NextResponse.json({
        success: false,
        message: "Vendedor não encontrado ou inativo",
      });
    }

    // Obter mês de referência (YYYY-MM)
    const mesReferencia = new Date().toISOString().slice(0, 7);

    // Verificar se já existe comissão para este mês
    const { data: comissaoExistente } = await supabase
      .from("comissoes")
      .select("id")
      .eq("vendedor_id", vendedor.id)
      .eq("cliente_id", clienteId)
      .eq("mes_referencia", mesReferencia)
      .single();

    if (comissaoExistente) {
      return NextResponse.json({
        success: false,
        message: "Comissão já registrada para este mês",
      });
    }

    // Registrar comissão
    const { error: insertError } = await supabase.from("comissoes").insert([
      {
        vendedor_id: vendedor.id,
        cliente_id: clienteId,
        valor: 20.0,
        mes_referencia: mesReferencia,
        status: "pendente",
        data_pagamento_cliente: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("❌ Erro ao registrar comissão:", insertError);
      return NextResponse.json(
        { error: "Erro ao registrar comissão" },
        { status: 500 },
      );
    }

    // Atualizar contador do vendedor
    await supabase.rpc("incrementar_total_indicacoes", {
      vendedor_id_param: vendedor.id,
    });

    return NextResponse.json({
      success: true,
      message: "Comissão registrada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao registrar comissão:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
