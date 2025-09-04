import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { dateOfBirth, whatsapp, acceptsOffers } = body;

    // Converte a data de nascimento para DateTime se fornecida
    let parsedDateOfBirth = null;
    if (dateOfBirth) {
      parsedDateOfBirth = new Date(dateOfBirth);
    }

    // Atualiza o usuário com as informações adicionais
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        dateOfBirth: parsedDateOfBirth,
        whatsapp: whatsapp || null,
        acceptsOffers: acceptsOffers || false,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        whatsapp: updatedUser.whatsapp,
        acceptsOffers: updatedUser.acceptsOffers,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
