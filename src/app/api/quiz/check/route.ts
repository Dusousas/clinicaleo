import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
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

    // Verificar se o usuário já respondeu o questionário
    const quizResponse = await prisma.quizResponse.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      hasResponse: !!quizResponse,
      response: quizResponse ? {
        id: quizResponse.id,
        responses: quizResponse.responses,
        createdAt: quizResponse.createdAt.toISOString(),
      } : null,
    });
  } catch (error) {
    console.error("Erro ao verificar questionário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
