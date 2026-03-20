import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(suppliers);
}

export async function POST(request) {
  try {
    const { name, cnpj } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "O nome é obrigatório." }, { status: 400 });
    }

    const newSupplier = await prisma.supplier.create({
      data: { name, cnpj },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Este CNPJ já está cadastrado." }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar fornecedor." }, { status: 500 });
  }
}
