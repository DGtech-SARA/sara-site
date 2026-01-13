'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function DownloadPage() {
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
              Acesse o SARA
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Progressive Web App - Funciona em qualquer dispositivo
            </p>
            <p className="text-white/70">
              Sem necessidade de baixar nada! Use direto no navegador 🚀
            </p>
          </div>

          {/* Acesso Web Principal */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-12 text-center mb-8 shadow-2xl">
            <div className="text-7xl mb-6">💻</div>
            <h2 className="text-4xl font-bold text-white mb-4">Acesso Web</h2>
            <p className="text-white/90 text-lg mb-8">
              Use o SARA direto no navegador do seu celular, tablet ou computador
            </p>
            <Link 
              href="/login"
              className="inline-block bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:scale-105 transition shadow-xl"
            >
              🌐 Acessar Agora
            </Link>
          </div>

          {/* Como Instalar PWA */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              📱 Instalar no Celular (Opcional)
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Android/Chrome */}
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-5xl mb-4 text-center">🤖</div>
                <h4 className="text-xl font-bold text-white mb-4 text-center">Android / Chrome</h4>
                <ol className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">1.</span>
                    <span>Acesse <strong>sarasistemas.com</strong> no Chrome</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">2.</span>
                    <span>Toque nos <strong>3 pontinhos</strong> (menu)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">3.</span>
                    <span>Selecione <strong>"Adicionar à tela inicial"</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">4.</span>
                    <span>Pronto! O ícone do SARA aparecerá na sua tela 🎉</span>
                  </li>
                </ol>
              </div>

              {/* iOS/Safari */}
              <div className="bg-white/5 rounded-xl p-6">
                <div className="text-5xl mb-4 text-center">🍎</div>
                <h4 className="text-xl font-bold text-white mb-4 text-center">iPhone / Safari</h4>
                <ol className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">1.</span>
                    <span>Acesse <strong>sarasistemas.com</strong> no Safari</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">2.</span>
                    <span>Toque no ícone de <strong>compartilhar</strong> (quadrado com seta)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">3.</span>
                    <span>Selecione <strong>"Adicionar à Tela de Início"</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-bold">4.</span>
                    <span>Pronto! O ícone do SARA aparecerá na sua tela 🎉</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Vantagens PWA */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              ✨ Vantagens do PWA
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold text-white mb-2">Rápido</h4>
                <p className="text-white/80 text-sm">Carrega instantaneamente</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📱</div>
                <h4 className="font-bold text-white mb-2">Funciona Offline</h4>
                <p className="text-white/80 text-sm">Acesso mesmo sem internet</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="font-bold text-white mb-2">Sempre Atualizado</h4>
                <p className="text-white/80 text-sm">Sem precisar baixar updates</p>
              </div>
            </div>
          </div>

          {/* Voltar */}
          <div className="text-center mt-12">
            <Link 
              href="/site"
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