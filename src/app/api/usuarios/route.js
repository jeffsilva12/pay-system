import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc"
    }
  })


  console.log(users);
  
  return NextResponse.json(users)

}