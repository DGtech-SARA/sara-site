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

export const metadata = {
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
