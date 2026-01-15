export const metadata: Metadata = {
  title: "SARA - Sistema de Agendamento e Relacionamento Automatizado",
  description:
    "Transforme seu negócio com tecnologia de ponta. Gestão de agendas, pagamentos online e chatbot WhatsApp oficial.",
  keywords: "agendamento, barbearia, salão, gestão, pagamentos, whatsapp",
  authors: [{ name: "D&G Sistemas" }],
  openGraph: {
    title: "SARA - Sistema de Agendamento",
    description:
      "Gestão completa para seu negócio com agendamentos, pagamentos e WhatsApp",
    url: "https://sarasistemas.com",
    siteName: "SARA",
    images: [
      {
        url: "https://sarasistemas.com/logo-sara.png",
        width: 512,
        height: 512,
        alt: "SARA Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARA - Sistema de Agendamento",
    description: "Gestão completa para seu negócio",
    images: ["https://sarasistemas.com/logo-sara.png"],
  },
  icons: {
    icon: "/logo-sara.png",
    shortcut: "/logo-sara.png",
    apple: "/logo-sara.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tag de verificação do Facebook/Meta */}
        <meta
          name="facebook-domain-verification"
          content="rm0bih9htuwyjc6c0dy9ucmz0yoma9"
        />
        {/* App ID do Facebook */}
        <meta property="fb:app_id" content="1286834143331619" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
