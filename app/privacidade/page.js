"use client";

import Link from "next/link";
import Image from "next/image";

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidade - SARA
            </h1>

            <p className="text-white/60 text-sm mb-8 italic">
              Última atualização: 17 de janeiro de 2026
            </p>

            <div className="space-y-8 text-white/90 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  1. Introdução
                </h2>
                <p>
                  A D&G Sistemas LTDA, proprietária do sistema SARA, está
                  comprometida em proteger a privacidade e os dados pessoais de
                  seus usuários. Esta Política de Privacidade descreve como
                  coletamos, usamos, armazenamos e protegemos suas informações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  2. Informações que Coletamos
                </h2>
                <p className="mb-3">Coletamos as seguintes informações:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Dados de Cadastro:</strong> Nome, email, telefone,
                    CPF/CNPJ, endereço
                  </li>
                  <li>
                    <strong>Dados de Negócio:</strong> Nome do estabelecimento,
                    serviços oferecidos, horários de funcionamento
                  </li>
                  <li>
                    <strong>Dados de Clientes:</strong> Nome, telefone e
                    histórico de agendamentos
                  </li>
                  <li>
                    <strong>Dados Financeiros:</strong> Informações de pagamento
                    processadas via Asaas (não armazenamos dados de cartão)
                  </li>
                  <li>
                    <strong>Dados de WhatsApp:</strong> Número de telefone,
                    mensagens enviadas e recebidas através do chatbot
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  3. Como Usamos suas Informações
                </h2>
                <p className="mb-3">Utilizamos seus dados para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fornecer e melhorar nossos serviços de agendamento</li>
                  <li>Processar pagamentos de forma segura</li>
                  <li>
                    Enviar confirmações e lembretes de agendamento via WhatsApp
                  </li>
                  <li>Gerenciar sua conta e preferências</li>
                  <li>Cumprir obrigações legais e fiscais</li>
                  <li>Prevenir fraudes e garantir a segurança da plataforma</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  4. Compartilhamento de Dados
                </h2>
                <p className="mb-3">Compartilhamos seus dados apenas com:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Asaas:</strong> Para processamento de pagamentos
                  </li>
                  <li>
                    <strong>Meta/WhatsApp:</strong> Para envio de mensagens
                    automáticas
                  </li>
                  <li>
                    <strong>Supabase:</strong> Para armazenamento seguro de
                    dados
                  </li>
                  <li>
                    <strong>Vercel:</strong> Para hospedagem da aplicação
                  </li>
                </ul>
                <p className="mt-3">
                  Não vendemos, alugamos ou compartilhamos seus dados pessoais
                  com terceiros para fins de marketing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  5. Armazenamento e Segurança
                </h2>
                <p>
                  Seus dados são armazenados em servidores seguros com
                  criptografia. Implementamos medidas técnicas e organizacionais
                  para proteger suas informações contra acesso não autorizado,
                  perda ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  6. Seus Direitos (LGPD)
                </h2>
                <p className="mb-3">Você tem direito a:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Solicitar portabilidade dos dados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  7. Retenção de Dados
                </h2>
                <p>
                  Mantemos seus dados pelo tempo necessário para fornecer nossos
                  serviços e cumprir obrigações legais (mínimo de 5 anos para
                  dados fiscais).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  8. Cookies e Tecnologias Similares
                </h2>
                <p>
                  Utilizamos cookies essenciais para o funcionamento do sistema,
                  como autenticação e preferências de usuário.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  9. WhatsApp Business
                </h2>
                <p>
                  Ao vincular seu WhatsApp Business ao SARA, você autoriza o
                  envio de mensagens automáticas para seus clientes, incluindo
                  confirmações de agendamento, lembretes e links de pagamento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  10. Alterações nesta Política
                </h2>
                <p>
                  Podemos atualizar esta política periodicamente. Notificaremos
                  sobre mudanças significativas por email ou através do sistema.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                  11. Contato
                </h2>
                <p className="mb-3">
                  Para questões sobre privacidade, entre em contato:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:dgtechsara@gmail.com"
                      className="text-pink-300 hover:underline"
                    >
                      dgtechsara@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Empresa:</strong> D&G Sistemas LTDA
                  </li>
                  <li>
                    <strong>CNPJ:</strong> 64.378.060/0001-72
                  </li>
                  <li>
                    <strong>Endereço:</strong> R Dr Circe de Castro Almeida, 20
                    - Parque Edu Chaves - São Paulo/SP
                  </li>
                </ul>
              </section>

              <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
                © 2026 D&G Sistemas LTDA - SARA. Todos os direitos reservados.
              </div>
            </div>
          </div>

          {/* Voltar */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-white hover:text-pink-300 transition inline-flex items-center gap-2"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
