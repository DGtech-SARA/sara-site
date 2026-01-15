import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SARA - Sistema de Agendamento e Relacionamento Automatizado",
  description:
    "Transforme seu negócio com tecnologia de ponta. Gestão de agendas, pagamentos online e chatbot WhatsApp oficial.",
  keywords: "agendamento, barbearia, salão, gestão, pagamentos, whatsapp",
  authors: [{ name: "D&G Sistemas" }],
  metadataBase: new URL("https://sarasistemas.com"),
  openGraph: {
    title: "SARA - Sistema de Agendamento e Relacionamento Automatizado",
    description:
      "Transforme seu negócio com tecnologia de ponta. Gestão de agendas, pagamentos online e chatbot WhatsApp oficial.",
    url: "https://sarasistemas.com",
    siteName: "SARA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SARA - Sistema de Agendamento",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARA - Sistema de Agendamento e Relacionamento Automatizado",
    description:
      "Transforme seu negócio com tecnologia de ponta. Gestão de agendas, pagamentos online e chatbot WhatsApp oficial.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo-sara.png",
    shortcut: "/logo-sara.png",
    apple: "/logo-sara.png",
  },
  other: {
    "facebook-domain-verification": "rm0bh9hgtuwyicic0dv9ucmz0yoms9",
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
