import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req) {

 const { name, email, password } = await req.json()

 const hash = await bcrypt.hash(password, 10)

 await prisma.user.create({
  data: {
   name,
   email,
   password: hash,
   role: "REGISTRO"
  }
 })

 return Response.json({ success: true })
}