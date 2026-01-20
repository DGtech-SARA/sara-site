export const metadata = {
  title: "Exclusão de Dados - SARA",
  description: "Solicite a exclusão dos seus dados do SARA",
};

export default function ExclusaoDadosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exclusão de Dados Pessoais
          </h1>
          <p className="text-gray-600">
            Solicite a exclusão dos seus dados do SARA
          </p>
        </div>

        {/* Informações */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 O que será excluído?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Seus dados cadastrais (nome, email, telefone)</li>
            <li>✅ Histórico de agendamentos</li>
            <li>✅ Histórico de pagamentos</li>
            <li>✅ Fotos e imagens enviadas</li>
            <li>✅ Conversas do WhatsApp</li>
            <li>✅ Todas as informações associadas à sua conta</li>
          </ul>
        </div>

        {/* Aviso */}
        <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            ⚠️ Atenção
          </h2>
          <p className="text-gray-700">
            Esta ação é <strong>irreversível</strong>. Após a exclusão, não será
            possível recuperar seus dados. Você precisará criar uma nova conta
            caso queira usar o SARA novamente.
          </p>
        </div>

        {/* Prazo */}
        <div className="mb-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            ⏰ Prazo de Exclusão
          </h2>
          <p className="text-gray-700">
            Sua solicitação será processada em até{" "}
            <strong>30 dias úteis</strong>, conforme a Lei Geral de Proteção de
            Dados (LGPD).
          </p>
        </div>

        {/* Formulário */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📧 Como solicitar a exclusão?
          </h2>
          <p className="text-gray-700 mb-4">
            Envie um email para nosso suporte com as seguintes informações:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <p className="font-semibold text-gray-900 mb-2">Email:</p>
            <a
              href="mailto:biel.vasseur@icloud.com?subject=Solicitação de Exclusão de Dados - SARA&body=Nome completo:%0D%0AEmail cadastrado:%0D%0ATelefone:%0D%0AMotivo da exclusão:%0D%0A"
              className="text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              biel.vasseur@icloud.com
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">
              Informações necessárias:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Assunto:</strong> Solicitação de Exclusão de Dados -
                SARA
              </li>
              <li>
                • <strong>Nome completo</strong>
              </li>
              <li>
                • <strong>Email cadastrado</strong> no SARA
              </li>
              <li>
                • <strong>Telefone</strong> (se cadastrado)
              </li>
              <li>
                • <strong>Motivo da exclusão</strong> (opcional)
              </li>
            </ul>
          </div>
        </div>

        {/* Botão de Email */}
        <div className="text-center">
          <a
            href="mailto:biel.vasseur@icloud.com?subject=Solicitação de Exclusão de Dados - SARA&body=Nome completo:%0D%0AEmail cadastrado:%0D%0ATelefone:%0D%0AMotivo da exclusão:%0D%0A"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            📧 Enviar Solicitação por Email
          </a>
        </div>

        {/* Rodapé */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            Dúvidas? Entre em contato: <strong>biel.vasseur@icloud.com</strong>
          </p>
          <p className="mt-2">D&G SISTEMAS LTDA - CNPJ: 64.378.960/0001-72</p>
        </div>
      </div>
    </div>
  );
}
