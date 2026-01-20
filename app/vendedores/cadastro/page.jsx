"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function CadastroVendedorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [etapa, setEtapa] = useState(1);

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

  // Comprovante MEI
  const [comprovanteUrl, setComprovanteUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // Validações básicas
      if (!nome || !email || !telefone || !cpf || !cnpjMei) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      // Inserir vendedor
      const { data, error } = await supabase.from("vendedores").insert([
        {
          nome,
          email,
          telefone: telefone.replace(/[^\d]/g, ""),
          cpf: cpf.replace(/[^\d]/g, ""),
          data_nascimento: dataNascimento,
          cnpj_mei: cnpjMei.replace(/[^\d]/g, ""),
          razao_social_mei: razaoSocial,
          nome_fantasia_mei: nomeFantasia,
          comprovante_mei_url: comprovanteUrl || "pendente",
          cep: cep.replace(/[^\d]/g, ""),
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          status: "pendente",
        },
      ]);

      if (error) throw error;

      alert("✅ Cadastro enviado! Aguarde aprovação do administrador.");
      router.push("/vendedores/login");
    } catch (error) {
      console.error("❌ Erro:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cadastro de Vendedor
          </h1>
          <p className="text-gray-600">
            Preencha os dados para se tornar um vendedor SARA
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{erro}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Dados Pessoais
            </h3>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome Completo *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              )}
            </InputMask>

            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Dados MEI */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Dados MEI</h3>

            <InputMask
              mask="99.999.999/9999-99"
              value={cnpjMei}
              onChange={(e) => setCnpjMei(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  placeholder="CNPJ MEI *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              )}
            </InputMask>

            <input
              type="text"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              placeholder="Razão Social *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              placeholder="Nome Fantasia"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Endereço</h3>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                )}
              </InputMask>

              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              placeholder="Rua *"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="text"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              placeholder="Complemento"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />

              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Estado (UF) *"
              maxLength={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Cadastro"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Já é vendedor?{" "}
            <a
              href="/vendedores/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
