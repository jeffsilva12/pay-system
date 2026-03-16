import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Para pegar o ID do usuário logado

export async function POST(request) {
  try {
    // 1. Verificar se o usuário está logado para pegar o ID dele
    const session = await getServerSession();
    
    // Se não tiver sessão (e você não estiver simulando), você precisará tratar isso.
    // Aqui estou buscando um usuário padrão ou o logado para não quebrar a FK do banco.
    const userEmail = session?.user?.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return NextResponse.json({ error: "Usuário não autorizado ou não encontrado." }, { status: 401 });
    }

    const data = await request.json();
    const { cliente, valor, descricao, status } = data;

    // 2. Validação simples
    if (!cliente || !valor) {
      return NextResponse.json({ error: "Cliente e Valor são obrigatórios." }, { status: 400 });
    }

    // 3. Mapear o status do Form (pt-br) para o Enum do Prisma (en)
    // No seu schema: PENDING, APPROVED, REJECTED
    const statusMap = {
      "pendente": "PENDING",
      "pago": "APPROVED"
    };

    const newPayment = await prisma.payment.create({
      data: {
        description: `Cliente: ${cliente} - ${descricao || ''}`,
        amount: parseFloat(valor),
        status: statusMap[status] || "PENDING",
        createdById: user.id, // ID do usuário que está registrando
      },
    });

    console.log("Pagamento registrado:", newPayment.id);
    
    return NextResponse.json(newPayment, { status: 201 });

  } catch (error) {
    console.error("Erro ao registrar pagamento:", error);
    return NextResponse.json({ error: "Erro interno ao registrar pagamento." }, { status: 500 });
  }
}
