"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AguardandoAprovacao() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* HEADER */}
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
            href="/site"
            className="text-white hover:text-pink-300 transition"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Ícone animado */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-9xl mb-8"
            >
              ⏳
            </motion.div>

            {/* Título */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cadastro{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Recebido!
              </span>
            </h1>

            <p className="text-2xl text-white/80 mb-12">
              Aguardando aprovação da D&G Sistemas
            </p>

            {/* Card de informações */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-left">
                  <span className="text-4xl">📧</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Você receberá um email
                    </h3>
                    <p className="text-white/80">
                      Assim que seu cadastro for aprovado, enviaremos um email
                      com suas credenciais de acesso e seu link de indicação
                      personalizado.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex items-start gap-4 text-left">
                  <span className="text-4xl">⏱️</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Tempo de aprovação
                    </h3>
                    <p className="text-white/80">
                      A análise do seu cadastro pode levar até 48 horas úteis.
                      Estamos verificando seus documentos e dados do MEI.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex items-start gap-4 text-left">
                  <span className="text-4xl">💰</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Comece a ganhar
                    </h3>
                    <p className="text-white/80">
                      Após a aprovação, você poderá compartilhar seu link e
                      ganhar R$ 20 por cada cliente que assinar através dele!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-yellow-500/20 backdrop-blur-lg border border-yellow-500/50 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">⚠️</span>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Importante
                  </h3>
                  <p className="text-white/90">
                    Certifique-se de que o email cadastrado está correto e
                    verifique sua caixa de spam. Se tiver dúvidas, entre em
                    contato conosco através do email{" "}
                    <a
                      href="mailto:suportesaradgtech@gmail.com"
                      className="text-pink-300 hover:underline"
                    >
                      suportesaradgtech@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/site"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition shadow-2xl"
              >
                🏠 Voltar ao Site
              </Link>
              <Link
                href="/vendedores/login"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
              >
                🔐 Já fui aprovado? Fazer Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
