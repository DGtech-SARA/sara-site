"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* PARTÍCULAS FLUTUANTES (EFEITO NEVE) */}
      <Particles />

      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* BENEFÍCIOS */}
      <Beneficios />

      {/* COMO FUNCIONA */}
      <ComoFunciona />

      {/* PROGRAMA DE VENDEDORES */}
      <ProgramaVendedores />

      {/* PLANOS */}
      <Planos />

      {/* CTA FINAL */}
      <CTAFinal />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

// COMPONENTE DE PARTÍCULAS FLUTUANTES
function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Gera 50 partículas com posições e velocidades aleatórias
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      animationDelay: Math.random() * 10,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `fall ${particle.animationDuration}s linear infinite`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          100% {
            transform: translateY(110vh) translateX(50px);
          }
        }
      `}</style>
    </div>
  );
}

// HEADER
function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
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

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white hover:text-purple-300 transition"
          >
            Início
          </Link>
          <Link
            href="#planos"
            className="text-white hover:text-purple-300 transition"
          >
            Planos
          </Link>
          <Link
            href="#vendedores"
            className="text-white hover:text-purple-300 transition"
          >
            Seja Vendedor
          </Link>
          <Link
            href="#sobre"
            className="text-white hover:text-purple-300 transition"
          >
            Sobre
          </Link>
          <Link
            href="#contato"
            className="text-white hover:text-purple-300 transition"
          >
            Contato
          </Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-white hover:text-purple-300 transition"
          >
            Entrar
          </Link>
          <Link
            href="/download"
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-full hover:scale-105 transition shadow-lg"
          >
            Baixar o App
          </Link>
        </div>
      </div>
    </header>
  );
}

// HERO
function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 relative z-10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-block bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-2 mb-8">
            <span className="text-purple-300 font-semibold">
              ✨ Sua assistente virtual de negócios
            </span>
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Conheça a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
              SARA
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Sistema de Agendamentos e Recebimentos Automatizado
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition shadow-2xl"
            >
              📱 Baixar o App
            </Link>
            <Link
              href="#planos"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
            >
              📋 Ver Planos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// BENEFÍCIOS
function Beneficios() {
  const beneficios = [
    {
      icon: "📅",
      titulo: "Gestão de Agendas",
      descricao:
        "Controle completo de horários e serviços. Fila de espera inteligente com encaixe em 1 clique.",
    },
    {
      icon: "💬",
      titulo: "Chatbot WhatsApp Oficial",
      descricao:
        "Integração oficial com Meta para atendimento automatizado 24/7 via WhatsApp.",
    },
    {
      icon: "💳",
      titulo: "Pagamentos Online",
      descricao:
        "Receba por PIX, cartão de crédito e débito com integração Asaas.",
    },
    {
      icon: "📊",
      titulo: "Dashboard em Tempo Real",
      descricao:
        "Acompanhe faturamento, agendamentos e métricas atualizadas em tempo real.",
    },
    {
      icon: "💰",
      titulo: "Controle Financeiro",
      descricao:
        "Gerencie receitas e despesas do dia a dia com gráficos e exportação para PDF.",
    },
    {
      icon: "🔔",
      titulo: "Notificações Automáticas",
      descricao: "Lembretes automáticos de agendamentos por WhatsApp e e-mail.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white/5 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Por que escolher a SARA?
          </h2>
          <p className="text-xl text-white/80">
            Tudo que você precisa para gerenciar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:scale-105 transition"
            >
              <div className="text-6xl mb-4">{beneficio.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {beneficio.titulo}
              </h3>
              <p className="text-white/80">{beneficio.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// COMO FUNCIONA
function ComoFunciona() {
  const passos = [
    {
      numero: "1",
      titulo: "Baixe o App",
      descricao: "Instale o SARA em menos de 2 minutos",
    },
    {
      numero: "2",
      titulo: "Configure seus Serviços",
      descricao: "Adicione seus serviços, horários e valores",
    },
    {
      numero: "3",
      titulo: "Comece a Receber",
      descricao: "Compartilhe seu link e receba agendamentos automaticamente",
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Como funciona?
          </h2>
          <p className="text-xl text-white/80">Simples, rápido e eficiente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {passos.map((passo, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6 shadow-lg">
                {passo.numero}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {passo.titulo}
              </h3>
              <p className="text-white/80">{passo.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PROGRAMA DE VENDEDORES
function ProgramaVendedores() {
  return (
    <section id="vendedores" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center">
          <div className="text-6xl mb-6">💰</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Programa de Vendedores SARA
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ganhe <strong className="text-purple-300">R$ 20,00</strong> por cada
            cliente que você indicar e assinar o plano FLOW ou FLOW PAY!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Metas Flexíveis
              </h3>
              <p className="text-white/70 text-sm">
                Acompanhe seu desempenho e resultados
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Link Exclusivo
              </h3>
              <p className="text-white/70 text-sm">
                Receba seu link personalizado de indicação
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Aprovação Rápida
              </h3>
              <p className="text-white/70 text-sm">Análise em até 24 horas</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* BOTÃO DESABILITADO - EM BREVE */}
            <button
              disabled
              className="bg-gray-500 text-white px-8 py-4 rounded-full text-lg font-semibold cursor-not-allowed opacity-60"
            >
              🚀 Em Breve
            </button>
            <Link
              href="/vendedores/login"
              className="bg-white/10 backdrop-blur-lg border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
            >
              🔐 Já sou Vendedor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// PLANOS
function Planos() {
  const [modalAberto, setModalAberto] = useState(false);

  const planos = [
    {
      nome: "FLOW",
      preco: "R$ 89",
      periodo: "/mês",
      descricao: "Gestão completa",
      recursos: [
        "Gestão completa de agendas",
        "Chatbot WhatsApp oficial Meta",
        "Dashboard básico",
        "Notificações automáticas",
        "Fila de espera inteligente",
        "Suporte Horário Comercial 9h até 18h",
      ],
      destaque: false,
    },
    {
      nome: "FLOW PAY",
      preco: "R$ 59",
      periodo: "/mês",
      descricao: "Mais popular",
      taxaAdicional: "+ 3% por transação + taxas Asaas",
      recursos: [
        "Tudo do FLOW +",
        "Pagamentos online (PIX, Cartão)",
        "Financeiro com gráficos em tempo real",
        "Controle de despesas do dia a dia",
        "Faturamento atualizado em tempo real",
        "Exportação para PDF",
        "Mensalidades personalizáveis",
        "Split de pagamento automático",
        "Suporte Horário Comercial 9h até 18h",
      ],
      destaque: true,
    },
  ];

  return (
    <section id="planos" className="py-20 px-4 bg-white/5 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-white/80">
            Planos transparentes para seu negócio crescer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planos.map((plano, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plano.destaque
                  ? "bg-gradient-to-br from-purple-500 to-purple-700 scale-105 shadow-2xl"
                  : "bg-white/10 backdrop-blur-lg border border-white/20"
              }`}
            >
              {plano.destaque && (
                <div className="bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  ⭐ MAIS POPULAR
                </div>
              )}

              <h3 className="text-3xl font-bold text-white mb-2">
                {plano.nome}
              </h3>
              <p className="text-white/80 mb-6">{plano.descricao}</p>

              <div className="mb-2">
                <span className="text-5xl font-bold text-white">
                  {plano.preco}
                </span>
                <span className="text-white/80">{plano.periodo}</span>
              </div>

              {plano.taxaAdicional && (
                <p className="text-white/90 text-sm mb-4">
                  {plano.taxaAdicional}
                </p>
              )}

              <ul className="space-y-3 mb-8 mt-6">
                {plano.recursos.map((recurso, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/90">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>

              {plano.destaque && (
                <button
                  onClick={() => setModalAberto(true)}
                  className="w-full mb-4 py-3 rounded-full font-semibold transition bg-white/20 backdrop-blur-lg border-2 border-white text-white hover:bg-white/30"
                >
                  ℹ️ Ver Taxas Asaas
                </button>
              )}

              <Link
                href="/download"
                className={`block text-center py-3 rounded-full font-semibold transition ${
                  plano.destaque
                    ? "bg-white text-purple-600 hover:bg-gray-100"
                    : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:scale-105"
                }`}
              >
                Baixar o App
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Taxas Asaas */}
      {modalAberto && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-purple-600">
                Taxas Asaas (2026)
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              As taxas abaixo são cobradas pela plataforma de pagamentos Asaas:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">PIX</div>
                <div className="text-gray-700">R$ 1,89 por transação</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">Boleto</div>
                <div className="text-gray-700">
                  R$ 1,89 por cobrança liquidada
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">
                  Cartão de Crédito (à vista)
                </div>
                <div className="text-gray-700">2,89% por transação</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">
                  Cartão de Crédito (2-6x)
                </div>
                <div className="text-gray-700">3,12% por transação</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">
                  Cartão de Crédito (7-12x)
                </div>
                <div className="text-gray-700">3,44% por transação</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">
                  Cartão de Débito
                </div>
                <div className="text-gray-700">1,89% por transação</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> A taxa de 3% do SARA é calculada
                sobre o valor líquido após o split de pagamento, não sobre o
                valor bruto da transação.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Fonte:{" "}
              <a
                href="https://www.asaas.com/precos-e-taxas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Asaas - Preços e Taxas
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// CTA FINAL
function CTAFinal() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Baixe agora e tenha controle total da sua agenda e pagamentos
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition shadow-2xl"
            >
              📱 Baixar o App Agora
            </Link>
            <Link
              href="#planos"
              className="bg-white/20 backdrop-blur-lg border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
            >
              📋 Ver Planos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// FOOTER
function Footer() {
  return (
    <footer
      id="contato"
      className="bg-black/30 border-t border-white/10 py-12 px-4 relative z-10"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo e descrição */}
          <div id="sobre">
            <div className="flex items-center gap-3 mb-4">
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
            <p className="text-white/60 text-sm">by D&G Sistemas</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#planos"
                  className="text-white/60 hover:text-white transition"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-white/60 hover:text-white transition"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-white/60 hover:text-white transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-white/60 hover:text-white transition"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/vendedores/cadastro"
                  className="text-white/60 hover:text-white transition"
                >
                  Seja Vendedor
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-white/60 hover:text-white transition"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-white/60 hover:text-white transition"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-white/60 hover:text-white transition"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/exclusao-dados"
                  className="text-white/60 hover:text-white transition"
                >
                  Exclusão de Dados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>📧 suportesaradgtech@gmail.com</li>
              <li>📱 Suporte Horário Comercial 9h até 18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>© 2026 D&G Sistemas. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">CNPJ: 64.378.960/0001-72</p>
        </div>
      </div>
    </footer>
  );
}
