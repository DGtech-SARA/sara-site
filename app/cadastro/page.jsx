"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

export default function CadastroVendedorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Inicializar Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  // Dados pessoais
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  // Dados MEI
  const [cnpjMei, setCnpjMei] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // Validações básicas
      if (!nome || !email || !telefone || !cpf || !cnpjMei || !razaoSocial) {
        throw new Error("Preencha todos os campos obrigatórios (*)");
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        throw new Error(
          "Preencha todos os campos de endereço obrigatórios (*)",
        );
      }

      // Inserir vendedor
      const { data, error } = await supabase
        .from("vendedores")
        .insert([
          {
            nome,
            email,
            telefone: telefone.replace(/[^\d]/g, ""),
            cpf: cpf.replace(/[^\d]/g, ""),
            data_nascimento: dataNascimento || null,
            cnpj_mei: cnpjMei.replace(/[^\d]/g, ""),
            razao_social_mei: razaoSocial,
            nome_fantasia_mei: nomeFantasia || null,
            comprovante_mei_url: "pendente",
            cep: cep.replace(/[^\d]/g, ""),
            rua,
            numero,
            complemento: complemento || null,
            bairro,
            cidade,
            estado: estado.toUpperCase(),
            status: "pendente",
          },
        ])
        .select();

      if (error) throw error;

      alert(
        "✅ Cadastro enviado com sucesso!\n\nAguarde a aprovação do administrador (até 24h).\n\nVocê receberá um email quando for aprovado.",
      );
      router.push("/vendedores/aguardando-aprovacao");
    } catch (error) {
      console.error("❌ Erro ao cadastrar:", error);
      setErro(error.message || "Erro ao enviar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 relative overflow-hidden">
      {/* Header */}
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
          <Link
            href="/"
            className="text-white/80 hover:text-white transition text-sm"
          >
            ← Voltar ao Site
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Card Principal */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">💰</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Programa de Vendedores{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  SARA
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-2">
                Ganhe <span className="font-bold text-pink-300">R$ 20,00</span>{" "}
                por cada cliente indicado!
              </p>
              <p className="text-white/70">
                Cadastre-se e comece a ganhar dinheiro hoje mesmo
              </p>
            </div>

            {erro && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <p className="text-red-200 text-sm">❌ {erro}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">📋</span>
                  <h3 className="text-2xl font-bold text-white">
                    Dados Pessoais
                  </h3>
                </div>

                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome Completo *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <IMaskInput
                  mask="(00) 00000-0000"
                  value={telefone}
                  onAccept={(value) => setTelefone(value)}
                  placeholder="Telefone *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IMaskInput
                    mask="000.000.000-00"
                    value={cpf}
                    onAccept={(value) => setCpf(value)}
                    placeholder="CPF *"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                    required
                  />

                  <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  />
                </div>
              </div>

              {/* Dados MEI */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">🏢</span>
                  <h3 className="text-2xl font-bold text-white">Dados MEI</h3>
                </div>

                <IMaskInput
                  mask="00.000.000/0000-00"
                  value={cnpjMei}
                  onAccept={(value) => setCnpjMei(value)}
                  placeholder="CNPJ MEI *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <input
                  type="text"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  placeholder="Razão Social *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <input
                  type="text"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  placeholder="Nome Fantasia (opcional)"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                />
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">📍</span>
                  <h3 className="text-2xl font-bold text-white">Endereço</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IMaskInput
                    mask="00000-000"
                    value={cep}
                    onAccept={(value) => setCep(value)}
                    placeholder="CEP *"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                    required
                  />

                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Número *"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                    required
                  />
                </div>

                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Rua *"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                  required
                />

                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Complemento (opcional)"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Bairro *"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                    required
                  />

                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade *"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition"
                    required
                  />

                  <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value.toUpperCase())}
                    placeholder="UF *"
                    maxLength={2}
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition uppercase"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:scale-105 transform"
              >
                {loading ? "⏳ Enviando..." : "🚀 Enviar Cadastro"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/80">
                Já é vendedor?{" "}
                <Link
                  href="/vendedores/login"
                  className="text-pink-300 font-semibold hover:text-pink-200 transition"
                >
                  Fazer Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
