"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 Cadastro de Vendedor SARA
          </h1>
          <p className="text-gray-600">
            Ganhe R$ 20,00 por cada cliente indicado!
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">❌ {erro}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              📋 Dados Pessoais
            </h3>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome Completo *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />

            <InputMask
              mask="(99) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  placeholder="Telefone *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              )}
            </InputMask>

            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  placeholder="CPF *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              )}
            </InputMask>

            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              placeholder="Data de Nascimento"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Dados MEI */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              🏢 Dados MEI
            </h3>

            <InputMask
              mask="99.999.999/9999-99"
              value={cnpjMei}
              onChange={(e) => setCnpjMei(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  placeholder="CNPJ MEI *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              )}
            </InputMask>

            <input
              type="text"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              placeholder="Razão Social *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />

            <input
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              placeholder="Nome Fantasia (opcional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              📍 Endereço
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InputMask
                mask="99999-999"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    placeholder="CEP *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                )}
              </InputMask>

              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              placeholder="Rua *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />

            <input
              type="text"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              placeholder="Complemento (opcional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />

              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              placeholder="Estado (UF) *"
              maxLength={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "⏳ Enviando..." : "🚀 Enviar Cadastro"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600 text-sm">
            Já é vendedor?{" "}
            <Link
              href="/vendedores/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Fazer Login
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            <Link
              href="/"
              className="text-purple-600 font-semibold hover:underline"
            >
              ← Voltar ao Site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
