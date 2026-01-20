import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function GET(request) {
  try {
    // Verificar autenticação
    const cookieStore = cookies();
    const vendedorId = cookieStore.get("vendedor_id")?.value;

    if (!vendedorId) {
      return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
    }

    // Buscar dados do vendedor
    const { data: vendedor, error: vendedorError } = await supabase
      .from("vendedores")
      .select("*")
      .eq("id", vendedorId)
      .single();

    if (vendedorError || !vendedor) {
      return NextResponse.json(
        { erro: "Vendedor não encontrado" },
        { status: 404 },
      );
    }

    // Verificar se está aprovado
    if (vendedor.status !== "aprovado") {
      return NextResponse.json(
        { erro: "Vendedor ainda não foi aprovado" },
        { status: 403 },
      );
    }

    // Buscar indicações
    const { data: indicacoes, error: indicacoesError } = await supabase
      .from("usuarios")
      .select(
        `
        id,
        nome,
        email,
        plano,
        status_assinatura,
        created_at
      `,
      )
      .eq("vendedor_id", vendedorId)
      .order("created_at", { ascending: false });

    if (indicacoesError) {
      console.error("Erro ao buscar indicações:", indicacoesError);
    }

    // Calcular estatísticas
    const totalIndicacoes = indicacoes?.length || 0;
    const indicacoesAtivas =
      indicacoes?.filter((i) => i.status_assinatura === "ativo").length || 0;
    const totalGanho = indicacoesAtivas * 20; // R$ 20 por indicação ativa

    // Formatar indicações para exibição
    const indicacoesFormatadas = indicacoes?.map((indicacao) => ({
      nome_cliente: indicacao.nome,
      data: indicacao.created_at,
      plano: indicacao.plano === "flow_pay" ? "FLOW PAY" : "FLOW",
      status: indicacao.status_assinatura === "ativo" ? "ativo" : "pendente",
      ganho: indicacao.status_assinatura === "ativo" ? 20 : 0,
    }));

    return NextResponse.json({
      nome: vendedor.nome,
      email: vendedor.email,
      codigo_indicacao: vendedor.codigo_indicacao,
      link_indicacao: vendedor.link_indicacao,
      total_indicacoes: totalIndicacoes,
      indicacoes_ativas: indicacoesAtivas,
      total_ganho: totalGanho,
      indicacoes: indicacoesFormatadas || [],
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
