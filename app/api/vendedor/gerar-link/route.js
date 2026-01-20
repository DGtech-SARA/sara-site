import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { vendedor_id } = await request.json();

    if (!vendedor_id) {
      return NextResponse.json(
        { erro: "ID do vendedor não informado" },
        { status: 400 },
      );
    }

    // Buscar vendedor
    const { data: vendedor, error } = await supabase
      .from("vendedores")
      .select("*")
      .eq("id", vendedor_id)
      .single();

    if (error || !vendedor) {
      return NextResponse.json(
        { erro: "Vendedor não encontrado" },
        { status: 404 },
      );
    }

    // Verificar se já tem link
    if (vendedor.codigo_indicacao && vendedor.link_indicacao) {
      return NextResponse.json({
        codigo: vendedor.codigo_indicacao,
        link: vendedor.link_indicacao,
      });
    }

    // Gerar código único
    const codigo = crypto.randomBytes(4).toString("hex").toUpperCase();

    // Gerar link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sara.app";
    const link = `${baseUrl}/cadastro?ref=${codigo}`;

    // Atualizar vendedor
    const { error: updateError } = await supabase
      .from("vendedores")
      .update({
        codigo_indicacao: codigo,
        link_indicacao: link,
      })
      .eq("id", vendedor_id);

    if (updateError) {
      console.error("Erro ao atualizar vendedor:", updateError);
      return NextResponse.json({ erro: "Erro ao gerar link" }, { status: 500 });
    }

    return NextResponse.json({
      codigo,
      link,
    });
  } catch (error) {
    console.error("Erro ao gerar link:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
