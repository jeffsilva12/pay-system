import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// ✅ EDITAR USUÁRIO
export async function PUT(request, { params }) {
  try {
    const { id } = await params; // ✅ corrigido

    const data = await request.json();
    const { name, email, role } = data;

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        role,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

// ✅ DELETAR USUÁRIO
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}