import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { vendedor_id, nome, email, cnpj_mei } = await request.json();

    // Configurar transporter (usando Gmail como exemplo)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email para D&G Sistemas
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "suportesaradgtech@gmail.com",
      subject: "🆕 Novo Vendedor Cadastrado - SARA",
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
              font-size: 48px;
              margin-bottom: 10px;
            }
            h1 {
              color: #667eea;
              margin: 0;
            }
            .info {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
            }
            .info-item {
              margin: 10px 0;
              padding: 10px;
              border-left: 4px solid #667eea;
              background: white;
            }
            .info-item strong {
              color: #667eea;
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
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎉</div>
              <h1>Novo Vendedor Cadastrado!</h1>
            </div>

            <p>Um novo vendedor se cadastrou na plataforma SARA e está aguardando aprovação.</p>

            <div class="info">
              <div class="info-item">
                <strong>ID:</strong> ${vendedor_id}
              </div>
              <div class="info-item">
                <strong>Nome:</strong> ${nome}
              </div>
              <div class="info-item">
                <strong>Email:</strong> ${email}
              </div>
              <div class="info-item">
                <strong>CNPJ MEI:</strong> ${cnpj_mei}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/vendedores" class="button">
                🔍 Revisar Cadastro
              </a>
            </div>

            <div class="footer">
              <p>Este é um email automático do sistema SARA.</p>
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
