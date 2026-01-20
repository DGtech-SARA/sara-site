import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { erro: "Nenhum arquivo enviado" },
        { status: 400 },
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { erro: "Tipo de arquivo não permitido. Use PDF, JPG ou PNG." },
        { status: 400 },
      );
    }

    // Validar tamanho (máx 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { erro: "Arquivo muito grande. Tamanho máximo: 5MB" },
        { status: 400 },
      );
    }

    // Gerar nome único
    const ext = path.extname(file.name);
    const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;

    // Criar diretório se não existir
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "vendedores",
    );
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Diretório já existe
    }

    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Retornar URL
    const url = `/uploads/vendedores/${filename}`;

    return NextResponse.json({
      sucesso: true,
      url,
      filename,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { erro: "Erro ao fazer upload do arquivo" },
      { status: 500 },
    );
  }
}
