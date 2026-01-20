// No início do useEffect
useEffect(() => {
  // Capturar código de indicação da URL
  const params = new URLSearchParams(window.location.search);
  const refCode = params.get("ref");

  if (refCode) {
    // Salvar no localStorage
    localStorage.setItem("codigo_indicacao", refCode);

    // Opcional: Mostrar mensagem
    console.log("Código de indicação capturado:", refCode);
  }
}, []);

// Ao criar usuário, incluir vendedor_id
const criarUsuario = async () => {
  // ... código existente ...

  // Buscar vendedor pelo código
  const codigoIndicacao = localStorage.getItem("codigo_indicacao");
  let vendedorId = null;

  if (codigoIndicacao) {
    const { data: vendedor } = await supabase
      .from("vendedores")
      .select("id")
      .eq("codigo_indicacao", codigoIndicacao)
      .eq("status", "aprovado")
      .single();

    if (vendedor) {
      vendedorId = vendedor.id;
    }
  }

  // Incluir vendedor_id ao criar usuário
  const { data, error } = await supabase.from("usuarios").insert([
    {
      // ... outros campos ...
      vendedor_id: vendedorId,
    },
  ]);

  // Limpar localStorage
  if (vendedorId) {
    localStorage.removeItem("codigo_indicacao");
  }
};
