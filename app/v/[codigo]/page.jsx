"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function RedirecionarVendedor() {
  const params = useParams();
  const codigo = params.codigo;

  useEffect(() => {
    localStorage.setItem("vendedor_ref", codigo);
    setTimeout(() => {
      window.location.href = `/onboarding?ref=${codigo}`;
    }, 2000);
  }, [codigo]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #9333ea, #ec4899)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Bem-vindo!
        </h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Você foi indicado por um vendedor SARA!
        </p>
        <div style={{ fontSize: "40px" }}>⏳</div>
        <p style={{ color: "#999", fontSize: "14px", marginTop: "10px" }}>
          Redirecionando...
        </p>
        <div
          style={{
            background: "#f3e8ff",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#666" }}>Seu código:</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#9333ea" }}>
            {codigo}
          </p>
        </div>
      </div>
    </div>
  );
}
