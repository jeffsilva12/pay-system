import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req) {

  console.log('teste');
  

  const body = await req.json()
  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return Response.json({ error: "Usuário não encontrado" }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return Response.json({ error: "Senha inválida" }, { status: 401 })
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  return Response.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  })
}