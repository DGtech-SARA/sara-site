// ========================================
// ADICIONAR ESTA LÓGICA APÓS CRIAR A COBRANÇA COM SUCESSO
// ========================================

// Verificar se cliente tem indicação de vendedor
const { data: usuario } = await supabase
  .from("usuarios")
  .select("indicado_por")
  .eq("id", userId)
  .single();

if (usuario?.indicado_por) {
  // Buscar vendedor ativo
  const { data: vendedor } = await supabase
    .from("vendedores")
    .select("id, status")
    .eq("codigo_unico", usuario.indicado_por)
    .eq("status", "ativo")
    .single();

  if (vendedor) {
    // Registrar comissão
    const mesReferencia = new Date().toISOString().slice(0, 7); // "2026-01"

    // Verificar se já existe comissão para este mês
    const { data: comissaoExistente } = await supabase
      .from("comissoes")
      .select("id")
      .eq("vendedor_id", vendedor.id)
      .eq("cliente_id", userId)
      .eq("mes_referencia", mesReferencia)
      .maybeSingle();

    if (!comissaoExistente) {
      // Criar nova comissão
      await supabase.from("comissoes").insert([
        {
          vendedor_id: vendedor.id,
          cliente_id: userId,
          valor: 20.0,
          mes_referencia: mesReferencia,
          status: "pendente",
          data_pagamento_cliente: new Date().toISOString(),
        },
      ]);

      console.log(
        `✅ Comissão de R$ 20 registrada para vendedor ${usuario.indicado_por}`,
      );
    }
  }
}
