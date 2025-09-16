import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  perguntaComOpcoesSchema,
  validateForm,
} from "@/lib/validations/schemas";

const prisma = new PrismaClient();

// Helper para verificar se é admin
async function isAdmin(sessionUserId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: sessionUserId },
    select: { role: true },
  });
  return user?.role === "ADMIN";
}

// GET - Listar perguntas de um questionário
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Acesso negado. Faça login." },
        { status: 403 }
      );
    }

    if (!(await isAdmin(session.user.id))) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas admins podem acessar." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const questionarioId = searchParams.get("questionarioId");

    if (!questionarioId) {
      return NextResponse.json(
        { error: "ID do questionário é obrigatório" },
        { status: 400 }
      );
    }

    const perguntas = await prisma.pergunta.findMany({
      where: {
        questionario_id: questionarioId,
      },
      orderBy: {
        ordem: "asc",
      },
    });

    return NextResponse.json({ perguntas });
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova pergunta
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    if (!(await isAdmin(session.user.id))) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas admins podem criar perguntas." },
        { status: 403 }
      );
    }

    const {
      questionario_id,
      titulo,
      descricao,
      tipo,
      opcoes,
      obrigatoria = true,
      ordem = 0,
      ativa = true,
    } = await req.json();

    // Preparar dados para validação
    const dadosParaValidacao = {
      titulo,
      descricao,
      tipo,
      opcoes: opcoes || [],
      obrigatoria,
      ordem: parseInt(ordem) || 0,
      questionario_id,
    };

    // Validar com Zod
    const validationResult = validateForm(
      perguntaComOpcoesSchema,
      dadosParaValidacao
    );

    if (!validationResult.success) {
      const erros = Object.entries(validationResult.errors)
        .map(([campo, mensagem]) => `${campo}: ${mensagem}`)
        .join(", ");

      return NextResponse.json(
        { error: `Dados inválidos: ${erros}` },
        { status: 400 }
      );
    }

    // Verificar se o questionário existe
    const questionario = await prisma.questionario.findUnique({
      where: { id: validationResult.data.questionario_id },
    });

    if (!questionario) {
      return NextResponse.json(
        { error: "Questionário não encontrado" },
        { status: 404 }
      );
    }

    const pergunta = await prisma.pergunta.create({
      data: {
        questionario_id: validationResult.data.questionario_id,
        titulo: validationResult.data.titulo,
        descricao: validationResult.data.descricao,
        tipo: validationResult.data.tipo,
        opcoes: validationResult.data.opcoes,
        obrigatoria: validationResult.data.obrigatoria,
        ordem: validationResult.data.ordem,
        ativa,
      },
    });

    return NextResponse.json({
      success: true,
      pergunta,
      message: "Pergunta criada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao criar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar pergunta
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    if (!(await isAdmin(session.user.id))) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    const { id, titulo, descricao, tipo, opcoes, obrigatoria, ordem, ativa } =
      await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const pergunta = await prisma.pergunta.update({
      where: { id },
      data: {
        ...(titulo && { titulo }),
        ...(descricao !== undefined && { descricao }),
        ...(tipo && { tipo }),
        ...(opcoes !== undefined && { opcoes }),
        ...(obrigatoria !== undefined && { obrigatoria }),
        ...(ordem !== undefined && { ordem }),
        ...(ativa !== undefined && { ativa }),
      },
    });

    return NextResponse.json({
      success: true,
      pergunta,
      message: "Pergunta atualizada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir pergunta
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    if (!(await isAdmin(session.user.id))) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.pergunta.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Pergunta excluída com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
