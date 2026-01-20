'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SobrePage() {
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sobre o SARA
            </h1>
            <p className="text-xl text-white/80">
              Sistema de Agendamentos e Recebimentos Automatizado
            </p>
          </div>

          <div className="space-y-8">
            {/* Nossa História */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">📖 Nossa História</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                O SARA nasceu da necessidade de simplificar a gestão de negócios para microempreendedores. 
                Desenvolvido pela D&G Sistemas, nosso objetivo é oferecer uma solução completa, acessível e 
                fácil de usar para profissionais autônomos gerenciarem agendamentos, pagamentos e finanças.
              </p>
            </div>

            {/* Missão */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">🎯 Nossa Missão</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Empoderar microempreendedores com tecnologia de ponta, automatizando processos e 
                permitindo que foquem no que realmente importa: atender bem seus clientes e fazer 
                seus negócios crescerem.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">💎 Nossos Valores</h2>
              <ul className="space-y-3 text-white/90 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 text-2xl">✓</span>
                  <span><strong>Simplicidade:</strong> Tecnologia acessível para todos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 text-2xl">✓</span>
                  <span><strong>Transparência:</strong> Preços claros, sem surpresas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 text-2xl">✓</span>
                  <span><strong>Inovação:</strong> Sempre evoluindo com novas funcionalidades</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 text-2xl">✓</span>
                  <span><strong>Suporte:</strong> Atendimento 24/7 para nossos clientes</span>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">🏢 D&G Sistemas</h2>
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                Somos uma empresa brasileira especializada em soluções tecnológicas para pequenos 
                e médios negócios. Com o SARA, trazemos inovação e praticidade para o dia a dia 
                de milhares de empreendedores.
              </p>
              <p className="text-white/70">
                CNPJ: 57.924.255/0001-30
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Faça parte da revolução!
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Junte-se a centenas de profissionais que já transformaram seus negócios com o SARA
              </p>
              <Link 
                href="/site/download"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
              >
                📱 Baixar o SARA
              </Link>
            </div>
          </div>

          {/* Voltar */}
          <div className="text-center mt-12">
            <Link 
              href="/"
              className="text-white hover:text-pink-300 transition text-lg"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}