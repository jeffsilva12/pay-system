import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// O nome da função PRECISA ser POST em maiúsculo
export async function POST(req) {
  try {
    const { name, cnpj } = await req.json();
    const cleanCnpj = cnpj.replace(/\D/g, "");

    // Verifica se o CNPJ já existe
    const existente = await prisma.supplier.findUnique({
      where: { cnpj: cleanCnpj }
    });

    if (existente) {
      return NextResponse.json(
        { error: "Este CNPJ já está cadastrado." }, 
        { status: 409 }
      );
    }

    const novoFornecedor = await prisma.supplier.create({
      data: { 
        name: name.toUpperCase(), 
        cnpj: cleanCnpj 
      }
    });

    return NextResponse.json(novoFornecedor, { status: 201 });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." }, 
      { status: 500 }
    );
  }
}
