import prisma from "@/app/lib/prisma"

export async function GET() {
  try {

    const tables = await prisma.$queryRaw`
      SHOW TABLES
    `

    return Response.json({
      tables
    })

  } catch (error) {

    return Response.json({
      error: error.message
    }, { status: 500 })

  }
}