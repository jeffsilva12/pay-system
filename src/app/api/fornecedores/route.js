import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const fornecedores = await prisma.supplier.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(fornecedores);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar a lista" }, { status: 500 });
  }
}
