"use client";

import Link from "next/link";
import Image from "next/image";

export default function ExclusaoDadosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
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

          {/* Botão Voltar */}
          <Link
            href="/site"
            className="text-white hover:text-pink-300 transition"
          >
            ← Voltar ao Site
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Exclusão de Dados Pessoais
              </h1>
              <p className="text-xl text-white/80">
                Solicite a exclusão dos seus dados do SARA
              </p>
            </div>

            {/* O que será excluído */}
            <div className="mb-8 p-6 bg-blue-500/20 backdrop-blur-lg border border-blue-400/30 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                📋 O que será excluído?
              </h2>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Seus dados cadastrais (nome, email, telefone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Histórico de agendamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Histórico de pagamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Fotos e imagens enviadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Conversas do WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Todas as informações associadas à sua conta</span>
                </li>
              </ul>
            </div>

            {/* Aviso */}
            <div className="mb-8 p-6 bg-yellow-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                ⚠️ Atenção
              </h2>
              <p className="text-white/90 leading-relaxed">
                Esta ação é <strong className="text-white">irreversível</strong>
                . Após a exclusão, não será possível recuperar seus dados. Você
                precisará criar uma nova conta caso queira usar o SARA
                novamente.
              </p>
            </div>

            {/* Prazo */}
            <div className="mb-8 p-6 bg-green-500/20 backdrop-blur-lg border border-green-400/30 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                ⏰ Prazo de Exclusão
              </h2>
              <p className="text-white/90 leading-relaxed">
                Sua solicitação será processada em até{" "}
                <strong className="text-white">30 dias úteis</strong>, conforme
                a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </div>

            {/* Como solicitar */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                📧 Como solicitar a exclusão?
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Envie um email para nosso suporte com as seguintes informações:
              </p>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-6">
                <p className="font-bold text-white mb-3 text-lg">Email:</p>
                <a
                  href="mailto:dgtechsara@gmail.com?subject=Solicitação de Exclusão de Dados - SARA&body=Nome completo:%0D%0AEmail cadastrado:%0D%0ATelefone:%0D%0AMotivo da exclusão:%0D%0A"
                  className="text-pink-300 hover:text-pink-200 font-semibold text-xl transition"
                >
                  dgtechsara@gmail.com
                </a>
              </div>

              {/* Informações necessárias */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <p className="font-bold text-white mb-4 text-lg">
                  Informações necessárias:
                </p>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>
                      <strong className="text-white">Assunto:</strong>{" "}
                      Solicitação de Exclusão de Dados - SARA
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>
                      <strong className="text-white">Nome completo</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>
                      <strong className="text-white">Email cadastrado</strong>{" "}
                      no SARA
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>
                      <strong className="text-white">Telefone</strong> (se
                      cadastrado)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>
                      <strong className="text-white">Motivo da exclusão</strong>{" "}
                      (opcional)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botão de Email */}
            <div className="text-center mb-8">
              <a
                href="mailto:dgtechsara@gmail.com?subject=Solicitação de Exclusão de Dados - SARA&body=Nome completo:%0D%0AEmail cadastrado:%0D%0ATelefone:%0D%0AMotivo da exclusão:%0D%0A"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full text-lg hover:scale-105 transition shadow-2xl"
              >
                📧 Enviar Solicitação por Email
              </a>
            </div>

            {/* Rodapé */}
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-white/80 mb-2">
                Dúvidas? Entre em contato:{" "}
                <a
                  href="mailto:dgtechsara@gmail.com"
                  className="text-pink-300 hover:text-pink-200 font-semibold transition"
                >
                  dgtechsara@gmail.com
                </a>
              </p>
              <p className="text-white/60 text-sm">
                D&G SISTEMAS LTDA - CNPJ: 64.378.960/0001-72
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black/30 border-t border-white/10 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/logo-sara.png"
              alt="SARA"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-white">SARA</span>
          </div>
          <p className="text-white/60 text-sm mb-2">
            Sistema de Agendamentos e Recebimentos Automatizado
          </p>
          <p className="text-white/60 text-sm mb-4">by D&G Sistemas</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/site/privacidade"
              className="text-white/60 hover:text-white transition"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/site/termos"
              className="text-white/60 hover:text-white transition"
            >
              Termos de Uso
            </Link>
          </div>
          <p className="text-white/60 text-xs mt-6">
            © 2026 D&G Sistemas. Todos os direitos reservados.
          </p>
          <p className="text-white/60 text-xs mt-1">CNPJ: 64.378.960/0001-72</p>
        </div>
      </footer>
    </div>
  );
}
