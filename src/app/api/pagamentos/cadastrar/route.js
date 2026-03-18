import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const session = await getServerSession();
    console.log(session);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    console.log(session);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autorizado ou não encontrado." },
        { status: 401 }
      );
    }

    const data = await request.json();

    // 🔥 CAMPOS CORRETOS
    const { supplierId, amount, description } = data;

    // ✅ VALIDAÇÃO CORRIGIDA
    if (!supplierId || !amount) {
      return NextResponse.json(
        { error: "Fornecedor e valor são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se fornecedor existe
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId }
    });

    if (!supplier) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado." },
        { status: 404 }
      );
    }

    const newPayment = await prisma.payment.create({
      data: {
        description,
        amount: parseFloat(amount),
        supplierId,
        createdById: user.id,
        // status já é PENDENTE por padrão
      },
    });

    return NextResponse.json(newPayment, { status: 201 });

  } catch (error) {
    console.error("Erro ao registrar pagamento:", error);
    return NextResponse.json(
      { error: "Erro interno ao registrar pagamento." },
      { status: 500 }
    );
  }
}