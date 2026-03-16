import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // 1. Importe o bcrypt

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, role } = data;

    // Validação básica
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Todos os campos, incluindo o nível de acesso, são obrigatórios." },
        { status: 400 }
      );
    }

    // 2. Gere o Hash da senha (10 é o "salt rounds" padrão e seguro)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // 3. Salve a senha criptografada
        role,
      },
    });

    // Removemos a senha do objeto de retorno por segurança
    const { password: _, ...userWithoutPassword } = newUser;

    console.log("Usuário criado com sucesso:", userWithoutPassword.email);
    
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    // Tratamento de erro para e-mail duplicado (comum no Prisma/MySQL)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 400 });
    }

    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ error: "Erro interno ao criar usuário." }, { status: 500 });
  }
}
