import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Contagem de dados
  const [
    suppliersCount,
    usersCount,
    paymentsApproved,
    paymentsRejected,
    paymentsPending,
  ] = await Promise.all([
    prisma.supplier.count(),
    prisma.user.count(),
    prisma.payment.count({ where: { status: "AUTORIZADO" } }),
    prisma.payment.count({ where: { status: "REJEITADO" } }),
    prisma.payment.count({ where: { status: "PENDENTE" } }),
  ]);

  return NextResponse.json({
    suppliers: suppliersCount,
    users: usersCount,
    paymentsApproved,
    paymentsRejected,
    paymentsPending,
  });
}