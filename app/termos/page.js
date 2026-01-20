'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TermosPage() {
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
              Termos de Uso
            </h1>
            
            <div className="space-y-6 text-white/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-3">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e usar o SARA, você concorda com estes termos de uso e nossa política de privacidade.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">2. Descrição do Serviço</h2>
                <p>
                  O SARA é um sistema de agendamentos e recebimentos automatizado para microempreendedores, oferecendo gestão de agenda, pagamentos online e ferramentas administrativas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">3. Planos e Pagamentos</h2>
                <p>
                  Oferecemos planos mensais (FLOW e FLOW PAY). O pagamento é processado através da plataforma Asaas. Taxas adicionais podem ser aplicadas conforme o plano escolhido.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">4. Responsabilidades do Usuário</h2>
                <p>
                  Você é responsável por manter a confidencialidade de sua conta, fornecer informações precisas e usar o serviço de acordo com as leis aplicáveis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">5. Cancelamento</h2>
                <p>
                  Você pode cancelar sua assinatura a qualquer momento através das configurações da conta. O acesso continuará até o fim do período pago.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">6. Limitação de Responsabilidade</h2>
                <p>
                  O SARA é fornecido "como está". Não nos responsabilizamos por perdas indiretas ou danos decorrentes do uso do serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">7. Contato</h2>
                <p>
                  Para questões sobre os termos, entre em contato: <a href="mailto:suportesaradgtech@gmail.com" className="text-pink-300 hover:underline">suportesaradgtech@gmail.com</a>
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