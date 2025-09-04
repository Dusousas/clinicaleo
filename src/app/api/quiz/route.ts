import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login para salvar as respostas." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { quizType, responses } = body;

    // Validar dados obrigatórios
    if (!quizType || !responses) {
      return NextResponse.json(
        { error: "Tipo do quiz e respostas são obrigatórios." },
        { status: 400 }
      );
    }

    // Verificar se já existe uma resposta para este quiz do usuário
    const existingResponse = await prisma.quizResponse.findFirst({
      where: {
        userId: session.user.id,
        quizType: quizType,
      },
    });

    let quizResponse;

    if (existingResponse) {
      // Atualizar resposta existente
      quizResponse = await prisma.quizResponse.update({
        where: { id: existingResponse.id },
        data: {
          responses: responses,
          completedAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else {
      // Criar nova resposta
      quizResponse = await prisma.quizResponse.create({
        data: {
          userId: session.user.id,
          quizType: quizType,
          responses: responses,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Respostas salvas com sucesso!",
      data: quizResponse,
    });
  } catch (error) {
    console.error("Erro ao salvar respostas do quiz:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const quizType = searchParams.get("quizType");

    const whereClause: {
      userId: string;
      quizType?: string;
    } = {
      userId: session.user.id,
    };

    if (quizType) {
      whereClause.quizType = quizType;
    }

    const quizResponses = await prisma.quizResponse.findMany({
      where: whereClause,
      orderBy: { completedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: quizResponses,
    });
  } catch (error) {
    console.error("Erro ao buscar respostas do quiz:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
