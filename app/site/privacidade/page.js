'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PrivacidadePage() {
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
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Política de Privacidade
            </h1>
            
            <div className="space-y-6 text-white/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-3">1. Informações que Coletamos</h2>
                <p>
                  Coletamos informações que você nos fornece diretamente, como nome, email, telefone e dados de pagamento quando você se cadastra no SARA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">2. Como Usamos suas Informações</h2>
                <p>
                  Utilizamos suas informações para fornecer, manter e melhorar nossos serviços, processar pagamentos e enviar notificações importantes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">3. Compartilhamento de Informações</h2>
                <p>
                  Não vendemos suas informações pessoais. Compartilhamos apenas com parceiros essenciais como processadores de pagamento (Asaas) e serviços de infraestrutura.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">4. Segurança</h2>
                <p>
                  Implementamos medidas de segurança para proteger suas informações, incluindo criptografia e armazenamento seguro.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">5. Seus Direitos</h2>
                <p>
                  Você tem direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento através das configurações da conta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">6. Contato</h2>
                <p>
                  Para questões sobre privacidade, entre em contato: <a href="mailto:suportesaradgtech@gmail.com" className="text-pink-300 hover:underline">suportesaradgtech@gmail.com</a>
                </p>
              </section>

              <p className="text-white/60 text-sm mt-8">
                Última atualização: Janeiro de 2026
              </p>
            </div>
          </div>

          {/* Voltar */}
          <div className="text-center mt-8">
            <Link 
              href="/site"
              className="text-white hover:text-pink-300 transition"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}