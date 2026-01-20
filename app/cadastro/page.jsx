"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

export default function CadastroPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(false);
  const [codigoIndicacao, setCodigoIndicacao] = useState(null);
  const [erro, setErro] = useState("");

  // Dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  // Capturar código de indicação da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");

    if (refCode) {
      localStorage.setItem("codigo_indicacao", refCode);
      setCodigoIndicacao(refCode);
      console.log("✅ Código de indicação capturado:", refCode);
    }
  }, []);

  // Validar CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  // Função de cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // Validações
      if (!nome || !email || !senha || !telefone || !cpf) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      if (senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }

      if (!validarCPF(cpf)) {
        throw new Error("CPF inválido");
      }

      // Verificar se CPF já existe
      const { data: cpfExistente } = await supabase
        .from("usuarios")
        .select("id")
        .eq("cpf", cpf.replace(/[^\d]/g, ""))
        .single();

      if (cpfExistente) {
        throw new Error("CPF já cadastrado");
      }

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome: nome,
          },
        },
      });

      if (authError) throw authError;

      // Buscar vendedor pelo código de indicação
      const codigoIndicacaoStorage = localStorage.getItem("codigo_indicacao");
      let vendedorId = null;

      if (codigoIndicacaoStorage) {
        const { data: vendedor } = await supabase
          .from("vendedores")
          .select("id")
          .eq("codigo_indicacao", codigoIndicacaoStorage)
          .eq("status", "aprovado")
          .single();

        if (vendedor) {
          vendedorId = vendedor.id;
          console.log("✅ Vendedor encontrado:", vendedor.id);
        }
      }

      // Criar registro na tabela usuarios
      const { error: dbError } = await supabase.from("usuarios").insert([
        {
          id: authData.user.id,
          nome: nome,
          email: email,
          telefone: telefone.replace(/[^\d]/g, ""),
          cpf: cpf.replace(/[^\d]/g, ""),
          vendedor_id: vendedorId,
          plano: "free",
          status: "ativo",
        },
      ]);

      if (dbError) throw dbError;

      // Limpar localStorage
      if (vendedorId) {
        localStorage.removeItem("codigo_indicacao");
      }

      // Redirecionar para onboarding
      alert("✅ Cadastro realizado com sucesso!");
      router.push("/onboarding");
    } catch (error) {
      console.error("❌ Erro ao cadastrar:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
          <p className="text-gray-600">
            Cadastre-se no SARA e comece a gerenciar seus agendamentos
          </p>
        </div>

        {/* Mensagem de indicação */}
        {codigoIndicacao && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 text-sm font-medium">
              ✅ Você foi indicado! Código: <strong>{codigoIndicacao}</strong>
            </p>
          </div>
        )}

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{erro}</p>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleCadastro} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Seu nome completo"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone *
            </label>
            <InputMask
              mask="(99) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                  required
                />
              )}
            </InputMask>
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPF *
            </label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                  required
                />
              )}
            </InputMask>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha *
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha *
            </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        {/* Link para login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
