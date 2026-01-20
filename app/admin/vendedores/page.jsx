"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function AdminVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("pendente");

  useEffect(() => {
    carregarVendedores();
  }, [filtro]);

  const carregarVendedores = async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from("vendedores")
        .select("*")
        .eq("status", filtro)
        .order("data_cadastro", { ascending: false });

      if (error) throw error;
      setVendedores(data || []);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao carregar vendedores");
    } finally {
      setCarregando(false);
    }
  };

  const aprovarVendedor = async (vendedorId) => {
    if (!confirm("Deseja aprovar este vendedor?")) return;

    const adminToken = prompt("Digite o token de admin:");
    if (!adminToken) return;

    try {
      const response = await fetch("/api/admin/aprovar-vendedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendedor_id: vendedorId,
          admin_token: adminToken,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro);
      }

      alert("✅ Vendedor aprovado com sucesso!");
      carregarVendedores();
    } catch (error) {
      alert("❌ Erro: " + error.message);
    }
  };

  const reprovarVendedor = async (vendedorId) => {
    const motivo = prompt("Digite o motivo da reprovação:");
    if (!motivo) return;

    const adminToken = prompt("Digite o token de admin:");
    if (!adminToken) return;

    try {
      const response = await fetch("/api/admin/aprovar-vendedor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendedor_id: vendedorId,
          admin_token: adminToken,
          motivo,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro);
      }

      alert("✅ Vendedor reprovado");
      carregarVendedores();
    } catch (error) {
      alert("❌ Erro: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 p-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold text-white mb-8">
          🔐 Painel Admin - Vendedores
        </h1>

        {/* Filtros */}
        <div className="flex gap-4 mb-8">
          {["pendente", "aprovado", "reprovado"].map((status) => (
            <button
              key={status}
              onClick={() => setFiltro(status)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                filtro === status
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {status === "pendente" && "⏳ Pendentes"}
              {status === "aprovado" && "✅ Aprovados"}
              {status === "reprovado" && "❌ Reprovados"}
            </button>
          ))}
        </div>

        {/* Lista */}
        {carregando ? (
          <div className="text-center text-white text-xl">Carregando...</div>
        ) : vendedores.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-white text-xl">
              Nenhum vendedor {filtro} encontrado
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vendedores.map((vendedor) => (
              <div
                key={vendedor.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      👤 Dados Pessoais
                    </h3>
                    <div className="space-y-2 text-white/80">
                      <p>
                        <strong>Nome:</strong> {vendedor.nome}
                      </p>
                      <p>
                        <strong>Email:</strong> {vendedor.email}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {vendedor.telefone}
                      </p>
                      <p>
                        <strong>CPF:</strong> {vendedor.cpf}
                      </p>
                    </div>
                  </div>

                  {/* Dados MEI */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      🏢 Dados do MEI
                    </h3>
                    <div className="space-y-2 text-white/80">
                      <p>
                        <strong>CNPJ:</strong> {vendedor.cnpj_mei}
                      </p>
                      <p>
                        <strong>Razão Social:</strong>{" "}
                        {vendedor.razao_social_mei}
                      </p>
                      <p>
                        <strong>Situação:</strong> {vendedor.situacao_mei}
                      </p>
                      <p>
                        <a
                          href={vendedor.comprovante_mei_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-300 hover:underline"
                        >
                          📄 Ver Comprovante
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      📍 Endereço
                    </h3>
                    <div className="text-white/80">
                      <p>
                        {vendedor.rua}, {vendedor.numero}
                        {vendedor.complemento && ` - ${vendedor.complemento}`}
                      </p>
                      <p>
                        {vendedor.bairro} - {vendedor.cidade}/{vendedor.estado}
                      </p>
                      <p>CEP: {vendedor.cep}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      📊 Informações
                    </h3>
                    <div className="space-y-2 text-white/80">
                      <p>
                        <strong>Cadastro:</strong>{" "}
                        {new Date(vendedor.data_cadastro).toLocaleString(
                          "pt-BR",
                        )}
                      </p>
                      {vendedor.codigo_indicacao && (
                        <p>
                          <strong>Código:</strong> {vendedor.codigo_indicacao}
                        </p>
                      )}
                      {vendedor.motivo_reprovacao && (
                        <p className="text-red-300">
                          <strong>Motivo:</strong> {vendedor.motivo_reprovacao}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões */}
                {filtro === "pendente" && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => aprovarVendedor(vendedor.id)}
                      className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                    >
                      ✅ Aprovar
                    </button>
                    <button
                      onClick={() => reprovarVendedor(vendedor.id)}
                      className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                    >
                      ❌ Reprovar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
