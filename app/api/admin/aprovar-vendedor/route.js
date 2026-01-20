import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { vendedor_id, admin_token } = await request.json();

    // Verificar token de admin
    if (admin_token !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

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

    // Verificar se já está aprovado
    if (vendedor.status === "aprovado") {
      return NextResponse.json(
        { erro: "Vendedor já está aprovado" },
        { status: 400 },
      );
    }

    // Gerar código de indicação único
    const codigo = crypto.randomBytes(4).toString("hex").toUpperCase();

    // Gerar link de indicação
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sara.app";
    const link = `${baseUrl}/cadastro?ref=${codigo}`;

    // Gerar senha temporária
    const senhaTemporaria = crypto.randomBytes(8).toString("hex");

    // Hash da senha (você deve usar bcrypt em produção)
    const senhaHash = crypto
      .createHash("sha256")
      .update(senhaTemporaria)
      .digest("hex");

    // Atualizar vendedor
    const { error: updateError } = await supabase
      .from("vendedores")
      .update({
        status: "aprovado",
        codigo_indicacao: codigo,
        link_indicacao: link,
        senha_hash: senhaHash,
        data_aprovacao: new Date().toISOString(),
      })
      .eq("id", vendedor_id);

    if (updateError) {
      console.error("Erro ao aprovar vendedor:", updateError);
      return NextResponse.json(
        { erro: "Erro ao aprovar vendedor" },
        { status: 500 },
      );
    }

    // Enviar email para o vendedor com credenciais
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/email/vendedor-aprovado`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: vendedor.nome,
            email: vendedor.email,
            senha_temporaria: senhaTemporaria,
            link_indicacao: link,
            codigo_indicacao: codigo,
          }),
        },
      );
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
      // Não bloquear a aprovação se o email falhar
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Vendedor aprovado com sucesso!",
      codigo_indicacao: codigo,
      link_indicacao: link,
      senha_temporaria: senhaTemporaria,
    });
  } catch (error) {
    console.error("Erro ao aprovar vendedor:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

// Endpoint para reprovar vendedor
export async function DELETE(request) {
  try {
    const { vendedor_id, admin_token, motivo } = await request.json();

    // Verificar token de admin
    if (admin_token !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

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

    // Atualizar status
    const { error: updateError } = await supabase
      .from("vendedores")
      .update({
        status: "reprovado",
        motivo_reprovacao: motivo || "Não especificado",
        data_reprovacao: new Date().toISOString(),
      })
      .eq("id", vendedor_id);

    if (updateError) {
      console.error("Erro ao reprovar vendedor:", updateError);
      return NextResponse.json(
        { erro: "Erro ao reprovar vendedor" },
        { status: 500 },
      );
    }

    // Enviar email notificando reprovação
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/email/vendedor-reprovado`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: vendedor.nome,
            email: vendedor.email,
            motivo: motivo || "Não especificado",
          }),
        },
      );
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Vendedor reprovado",
    });
  } catch (error) {
    console.error("Erro ao reprovar vendedor:", error);
    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
