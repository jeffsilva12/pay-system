import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// EDITAR FORNECEDOR
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, email, taxId } = await request.json();

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: { name, email, taxId },
    });

    return NextResponse.json(updatedSupplier);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar fornecedor" }, { status: 500 });
  }
}

// DELETAR FORNECEDOR
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.supplier.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Fornecedor deletado" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar fornecedor" }, { status: 500 });
  }
}
