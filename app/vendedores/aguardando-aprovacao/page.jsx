"use client";

import Link from "next/link";

export default function AguardandoAprovacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-md text-center">
        <div className="text-6xl mb-6">⏳</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Cadastro Enviado!
        </h1>
        <p className="text-gray-600 mb-6">
          Seu cadastro foi enviado com sucesso e está aguardando aprovação do
          administrador.
        </p>
        <p className="text-gray-600 mb-8">
          Você receberá um email em até <strong>24 horas</strong> com o
          resultado da análise.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Voltar ao Site
        </Link>
      </div>
    </div>
  );
}
