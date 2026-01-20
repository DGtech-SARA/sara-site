"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginVendedor() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, tipo: "vendedor" }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao fazer login");
      }

      // Redirecionar para dashboard
      window.location.href = "/vendedores/dashboard";
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/site" className="flex items-center gap-3">
            <Image
              src="/logo-sara.png"
              alt="SARA"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-white">SARA</span>
          </Link>

          <Link
            href="/site"
            className="text-white hover:text-pink-300 transition"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Título */}
            <div className="text-center mb-12">
              <div className="inline-block bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-2 mb-6">
                <span className="text-pink-300 font-semibold">
                  🔐 Área do Vendedor
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Bem-vindo de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  volta!
                </span>
              </h1>
              <p className="text-xl text-white/80">
                Faça login para acessar seu dashboard
              </p>
            </div>

            {/* Formulário */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Erro */}
                {erro && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                    <p className="text-white text-sm">{erro}</p>
                  </div>
                )}

                {/* Botão */}
                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                >
                  {carregando ? "Entrando..." : "🚀 Entrar"}
                </button>
              </form>

              {/* Links */}
              <div className="mt-6 text-center space-y-3">
                <Link
                  href="/vendedores/recuperar-senha"
                  className="block text-pink-300 hover:text-pink-200 transition text-sm"
                >
                  Esqueceu sua senha?
                </Link>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/60 text-sm mb-2">
                    Ainda não é vendedor?
                  </p>
                  <Link
                    href="/vendedores/cadastro"
                    className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                  >
                    Cadastre-se agora
                  </Link>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-8 bg-blue-500/20 backdrop-blur-lg border border-blue-500/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl">💡</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Dica para Vendedores
                  </h3>
                  <p className="text-white/90 text-sm">
                    Compartilhe seu link nas redes sociais e ganhe R$ 20 por
                    cada cliente que assinar através do seu link!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
