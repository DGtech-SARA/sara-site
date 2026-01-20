import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { nome, email, motivo } = await request.json();

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
      subject: "Atualização sobre seu cadastro - SARA",
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
              color: #dc3545;
              margin: 0;
            }
            .alert-box {
              background: #f8d7da;
              border: 2px solid #dc3545;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .alert-box h3 {
              color: #721c24;
              margin-top: 0;
            }
            .motivo {
              background: white;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #dc3545;
              margin: 15px 0;
            }
            .info-box {
              background: #d1ecf1;
              border: 2px solid #17a2b8;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .info-box h3 {
              color: #0c5460;
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
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📋</div>
              <h1>Atualização do Cadastro</h1>
            </div>

            <p>Olá, ${nome}!</p>

            <div class="alert-box">
              <h3>❌ Cadastro Não Aprovado</h3>
              <p>Infelizmente, seu cadastro como vendedor SARA não foi aprovado neste momento.</p>
            </div>

            <h3 style="color: #667eea;">📝 Motivo:</h3>
            <div class="motivo">
              ${motivo}
            </div>

            <div class="info-box">
              <h3>💡 O que fazer agora?</h3>
              <p>Se você acredita que houve um erro ou deseja mais informações, entre em contato conosco:</p>
              <p><strong>Email:</strong> suportesaradgtech@gmail.com</p>
              <p>Nossa equipe terá prazer em ajudá-lo!</p>
            </div>

            <div style="text-align: center;">
              <a href="mailto:suportesaradgtech@gmail.com" class="button">
                📧 Entrar em Contato
              </a>
            </div>

            <div class="footer">
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
