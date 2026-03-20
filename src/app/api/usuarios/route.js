import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// ✅ LISTAR USUÁRIOS
export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const usersWithoutPassword = users.map(({ password, ...user }) => user);

  return NextResponse.json(usersWithoutPassword);
}

// ✅ CRIAR USUÁRIO
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, role } = data;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno ao criar usuário." },
      { status: 500 }
    );
  }
}