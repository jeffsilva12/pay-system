import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const userId = session.user.id;

  const [
    suppliersCount,
    usersCount,
    paymentsApproved,
    paymentsRejected,
    paymentsPending,
    hasRejectedPayment
  ] = await Promise.all([
    prisma.supplier.count(),
    prisma.user.count(),
    prisma.payment.count({ where: { status: "AUTORIZADO" } }),
    prisma.payment.count({ where: { status: "REJEITADO" } }),
    prisma.payment.count({ where: { status: "PENDENTE" } }),

    // 🔥 Aqui é o segredo
    prisma.payment.findFirst({
      where: {
        status: "REJEITADO",
        userId: userId, // ajusta se o campo for outro nome
      },
    }),
  ]);

  return NextResponse.json({
    suppliers: suppliersCount,
    users: usersCount,
    paymentsApproved,
    paymentsRejected,
    paymentsPending,
    hasRejectedPayment: !!hasRejectedPayment,
  });
}