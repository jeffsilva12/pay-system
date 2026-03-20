import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

/* =========================
   ✅ GET - LISTAR PAGAMENTOS
========================= */
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        supplier: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Erro ao listar pagamentos:", error);
    return NextResponse.json(
      { error: "Erro ao listar pagamentos." },
      { status: 500 }
    );
  }
}

/* =========================
   ✅ POST - CRIAR PAGAMENTO
========================= */
export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { supplierId, amount, description } = data;

    if (!supplierId || !amount) {
      return NextResponse.json(
        { error: "Fornecedor e valor são obrigatórios." },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(supplierId) },
    });

    if (!supplier) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado." },
        { status: 404 }
      );
    }

    const newPayment = await prisma.payment.create({
      data: {
        description: description || "",
        amount: parseFloat(amount),
        supplierId: Number(supplierId),   // ✅ FK direta
        createdById: user.id,             // ✅ FK direta
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