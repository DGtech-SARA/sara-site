import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { nome, email, senha_temporaria, link_indicacao, codigo_indicacao } =
      await request.json();

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email para o vendedor
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎉 Parabéns! Você foi aprovado como Vendedor SARA",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 64px;
              margin-bottom: 10px;
            }
            h1 {
              color: #667eea;
              margin: 0;
              font-size: 32px;
            }
            .success-box {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 15px;
              padding: 30px;
              margin: 30px 0;
              text-align: center;
            }
            .success-box h2 {
              margin: 0 0 10px 0;
              font-size: 24px;
            }
            .credentials {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .credential-item {
              margin: 15px 0;
              padding: 15px;
              background: white;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            }
            .credential-item strong {
              color: #667eea;
              display: block;
              margin-bottom: 5px;
            }
            .credential-value {
              font-family: monospace;
              font-size: 16px;
              color: #333;
              background: #f0f0f0;
              padding: 10px;
              border-radius: 5px;
              word-break: break-all;
            }
            .link-box {
              background: #fff3cd;
              border: 2px solid #ffc107;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .link-box h3 {
              color: #856404;
              margin-top: 0;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              border-radius: 10px;
              text-decoration: none;
              font-weight: bold;
              margin: 20px 0;
            }
            .steps {
              background: #e7f3ff;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .step {
              margin: 15px 0;
              padding-left: 30px;
              position: relative;
            }
            .step::before {
              content: "✓";
              position: absolute;
              left: 0;
              background: #667eea;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎉</div>
              <h1>Parabéns, ${nome}!</h1>
              <p style="font-size: 18px; color: #666;">Você foi aprovado como Vendedor SARA!</p>
            </div>

            <div class="success-box">
              <h2>✅ Cadastro Aprovado</h2>
              <p style="margin: 0;">Agora você pode começar a ganhar R$ 20 por cada cliente indicado!</p>
            </div>

            <h2 style="color: #667eea;">🔐 Suas Credenciais de Acesso</h2>
            
            <div class="credentials">
              <div class="credential-item">
                <strong>📧 Email:</strong>
                <div class="credential-value">${email}</div>
              </div>
              
              <div class="credential-item">
                <strong>🔑 Senha Temporária:</strong>
                <div class="credential-value">${senha_temporaria}</div>
              </div>
            </div>

            <div class="warning">
              <strong>⚠️ Importante:</strong> Altere sua senha no primeiro acesso por segurança!
            </div>

            <h2 style="color: #667eea;">🔗 Seu Link de Indicação</h2>
            
            <div class="link-box">
              <h3>💰 Ganhe R$ 20 por indicação!</h3>
              <p><strong>Código:</strong> <span style="font-family: monospace; font-size: 18px; color: #667eea;">${codigo_indicacao}</span></p>
              <p><strong>Seu Link:</strong></p>
              <div class="credential-value">${link_indicacao}</div>
            </div>

            <h2 style="color: #667eea;">📋 Próximos Passos</h2>
            
            <div class="steps">
              <div class="step">
                <strong>Faça login no sistema</strong><br>
                Use suas credenciais para acessar o dashboard
              </div>
              <div class="step">
                <strong>Altere sua senha</strong><br>
                Por segurança, troque a senha temporária
              </div>
              <div class="step">
                <strong>Copie seu link de indicação</strong><br>
                Está disponível no seu dashboard
              </div>
              <div class="step">
                <strong>Compartilhe nas redes sociais</strong><br>
                WhatsApp, Facebook, Instagram, etc.
              </div>
              <div class="step">
                <strong>Acompanhe seus ganhos</strong><br>
                Veja em tempo real suas indicações e comissões
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/vendedores/login" class="button">
                🚀 Acessar Dashboard
              </a>
            </div>

            <div class="footer">
              <p><strong>Dúvidas?</strong> Entre em contato: suportesaradgtech@gmail.com</p>
              <p>D&G Sistemas - Tecnologia para seu negócio</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      sucesso: true,
      mensagem: "Email enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ erro: "Erro ao enviar email" }, { status: 500 });
  }
}
