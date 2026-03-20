import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// EDITAR PAGAMENTO (Ex: Mudar status ou valor)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { amount, status, description } = await request.json();

    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: { 
        amount: Number(amount), 
        status, // "AUTORIZADO", "REJEITADO" ou "PENDENTE"
        description 
      },
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar pagamento" }, { status: 500 });
  }
}

// DELETAR PAGAMENTO
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.payment.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Pagamento removido" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar pagamento" }, { status: 500 });
  }
}
