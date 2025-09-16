import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Listar perguntas para o quiz
export async function GET() {
  try {
    // Buscar o primeiro questionário ativo
    const questionario = await prisma.questionario.findFirst({
      where: {
        ativo: true,
      },
      include: {
        perguntas: {
          where: {
            ativa: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    if (!questionario) {
      return NextResponse.json(
        { error: "Nenhum questionário ativo encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      perguntas: questionario.perguntas,
      questionario: {
        id: questionario.id,
        titulo: questionario.titulo,
        descricao: questionario.descricao,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar perguntas para o quiz:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
