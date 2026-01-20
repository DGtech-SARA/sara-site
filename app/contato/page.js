'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ContatoPage() {
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
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-white/80">Estamos aqui para ajudar!</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-white mb-2">📧 Email</h3>
              <a
                href="mailto:suportesaradgtech@gmail.com"
                className="text-pink-300 hover:underline text-lg"
              >
                suportesaradgtech@gmail.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-white mb-2">📱 Suporte</h3>
              <p className="text-white/80 text-lg">Disponível 24/7</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-white mb-2">🏢 Empresa</h3>
              <p className="text-white/80 text-lg">D&G Sistemas</p>
              <p className="text-white/60 mt-2">CNPJ: 64.378.960/0001-72</p>
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