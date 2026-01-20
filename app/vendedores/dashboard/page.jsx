"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardVendedor() {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await fetch("/api/vendedor/dashboard");
      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao carregar dados");
      }

      setDados(resultado);
    } catch (error) {
      console.error("Erro:", error);
      // Redirecionar para login se não autenticado
      window.location.href = "/vendedores/login";
    } finally {
      setCarregando(false);
    }
  };

  const copiarLink = () => {
    if (dados?.link_indicacao) {
      navigator.clipboard.writeText(dados.link_indicacao);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const handleLogout = () => {
    // Implementar logout
    window.location.href = "/vendedores/login";
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">⏳</div>
          <p className="text-white text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-sara.png"
              alt="SARA"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-white">SARA</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-white/80 hidden md:block">
              Olá, {dados?.nome}!
            </span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-pink-300 transition"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Título */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Dashboard{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Vendedor
                </span>
              </h1>
              <p className="text-xl text-white/80">
                Acompanhe suas indicações e ganhos
              </p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Total de Indicações */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">👥</span>
                  <span className="text-white/60 text-sm">Total</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {dados?.total_indicacoes || 0}
                </div>
                <div className="text-white/80">Indicações</div>
              </div>

              {/* Indicações Ativas */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">✅</span>
                  <span className="text-white/60 text-sm">Ativas</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {dados?.indicacoes_ativas || 0}
                </div>
                <div className="text-white/80">Clientes Ativos</div>
              </div>

              {/* Total Ganho */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">💰</span>
                  <span className="text-white/80 text-sm">Ganhos</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  R$ {dados?.total_ganho?.toFixed(2) || "0.00"}
                </div>
                <div className="text-white/90">Total Acumulado</div>
              </div>
            </div>

            {/* Link de Indicação */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🔗</span>
                <h2 className="text-3xl font-bold text-white">
                  Seu Link de Indicação
                </h2>
              </div>

              <p className="text-white/80 mb-6">
                Compartilhe este link nas redes sociais e ganhe R$ 20 por cada
                cliente que assinar através dele!
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={dados?.link_indicacao || ""}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                />
                <button
                  onClick={copiarLink}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
                >
                  {copiado ? "✅ Copiado!" : "📋 Copiar"}
                </button>
              </div>

              {/* Botões de Compartilhamento */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Conheça a SARA! Sistema completo de agendamentos e pagamentos para seu negócio. ${dados?.link_indicacao}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:scale-105 transition"
                >
                  📱 WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    dados?.link_indicacao,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:scale-105 transition"
                >
                  📘 Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Conheça a SARA! ${dados?.link_indicacao}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-sky-500 text-white font-semibold hover:scale-105 transition"
                >
                  🐦 Twitter
                </a>
              </div>
            </div>

            {/* Tabela de Indicações */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                📊 Suas Indicações
              </h2>

              {dados?.indicacoes && dados.indicacoes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-white/80 py-3 px-4">
                          Cliente
                        </th>
                        <th className="text-left text-white/80 py-3 px-4">
                          Data
                        </th>
                        <th className="text-left text-white/80 py-3 px-4">
                          Plano
                        </th>
                        <th className="text-left text-white/80 py-3 px-4">
                          Status
                        </th>
                        <th className="text-left text-white/80 py-3 px-4">
                          Ganho
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.indicacoes.map((indicacao, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/10 hover:bg-white/5 transition"
                        >
                          <td className="text-white py-3 px-4">
                            {indicacao.nome_cliente}
                          </td>
                          <td className="text-white/80 py-3 px-4">
                            {new Date(indicacao.data).toLocaleDateString(
                              "pt-BR",
                            )}
                          </td>
                          <td className="text-white/80 py-3 px-4">
                            {indicacao.plano}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                indicacao.status === "ativo"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                              }`}
                            >
                              {indicacao.status === "ativo"
                                ? "✅ Ativo"
                                : "⏳ Pendente"}
                            </span>
                          </td>
                          <td className="text-white font-semibold py-3 px-4">
                            R$ {indicacao.ganho.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white/80 text-lg">
                    Você ainda não tem indicações.
                  </p>
                  <p className="text-white/60 mt-2">
                    Compartilhe seu link para começar a ganhar!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
