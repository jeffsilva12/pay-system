import prisma  from '@/app/lib/prisma'; // Ajuste o caminho conforme seu projeto
import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const { id, status, motivo } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Dados insuficientes" }, { status: 400 });
    }

    const pagamentoAtualizado = await prisma.payment.update({
      where: { id: id },
      data: { 
        status: status,
        rejectionReason: status === 'REJEITADO' ? motivo : null // Certifique-se que o campo existe no schema
      },
    });

    return NextResponse.json(pagamentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
