import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const payments = await prisma.payment.findMany({
    orderBy: {
      id: "desc"
    },
    include: {
    supplier: true,
    createdBy: true, // opcional
  },
  })

  return NextResponse.json(payments)

}