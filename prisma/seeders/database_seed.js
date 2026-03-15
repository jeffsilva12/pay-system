import pkg from "@prisma/client"
import bcrypt from "bcrypt"
import 'dotenv/config'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

async function main() {

  const password = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@admin.com",
      password,
      role: "ADMIN"
    }
  })

  console.log("✅ Usuário master criado")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })