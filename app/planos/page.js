'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PlanosPage() {
  const [modalAberto, setModalAberto] = useState(false);

  const planos = [
    {
      nome: 'FLOW',
      preco: 'R$ 89',
      periodo: '/mês',
      descricao: 'Gestão completa',
      recursos: [
        'Gestão completa de agendas',
        'Chatbot WhatsApp oficial Meta',
        'Dashboard básico',
        'Notificações automáticas',
        'Fila de espera inteligente',
        'Suporte 24/7'
      ],
      destaque: false
    },
    {
      nome: 'FLOW PAY',
      preco: 'R$ 59',
      periodo: '/mês',
      descricao: 'Mais popular',
      taxaAdicional: '+ 3% por transação + taxas Asaas',
      recursos: [
        'Tudo do FLOW +',
        'Pagamentos online (PIX, Cartão)',
        'Financeiro com gráficos em tempo real',
        'Controle de despesas do dia a dia',
        'Faturamento atualizado em tempo real',
        'Exportação para PDF',
        'Mensalidades personalizáveis',
        'Split de pagamento automático',
        'Suporte 24/7'
      ],
      destaque: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* Header */}
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
            href="/login"
            className="text-white hover:text-pink-300 transition"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Escolha seu plano
            </h1>
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
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 scale-105 shadow-2xl' 
                    : 'bg-white/10 backdrop-blur-lg border border-white/20'
                }`}
              >
                {plano.destaque && (
                  <div className="bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    ⭐ MAIS POPULAR
                  </div>
                )}
                
                <h3 className="text-3xl font-bold text-white mb-2">{plano.nome}</h3>
                <p className="text-white/80 mb-6">{plano.descricao}</p>
                
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">{plano.preco}</span>
                  <span className="text-white/80">{plano.periodo}</span>
                </div>
                
                {plano.taxaAdicional && (
                  <p className="text-white/90 text-sm mb-4">{plano.taxaAdicional}</p>
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
                  href="/site/download"
                  className={`block text-center py-3 rounded-full font-semibold transition ${
                    plano.destaque
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105'
                  }`}
                >
                  Começar Agora
                </Link>
              </div>
            ))}
          </div>

          {/* Voltar */}
          <div className="text-center mt-12">
            <Link 
              href="/site"
              className="text-white hover:text-pink-300 transition"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Taxas */}
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
              <h3 className="text-3xl font-bold text-purple-600">Taxas Asaas (2026)</h3>
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
                <div className="font-bold text-purple-600 mb-1">Cartão de Crédito (à vista)</div>
                <div className="text-gray-700">2,89% por transação</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-1">Cartão de Débito</div>
                <div className="text-gray-700">1,89% por transação</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Fonte: <a href="https://www.asaas.com/precos-e-taxas" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Asaas - Preços e Taxas</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}