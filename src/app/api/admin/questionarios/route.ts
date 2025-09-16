import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  questionarioSchema,
  questionarioUpdateSchema,
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

// GET - Listar todos os questionários
export async function GET() {
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

    const questionarios = await prisma.questionario.findMany({
      include: {
        perguntas: {
          orderBy: {
            ordem: "asc",
          },
        },
      },
      orderBy: {
        ordem: "asc",
      },
    });

    return NextResponse.json({ questionarios });
  } catch (error) {
    console.error("Erro ao buscar questionários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo questionário
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
        { error: "Acesso negado. Apenas admins podem criar questionários." },
        { status: 403 }
      );
    }

    const {
      titulo,
      descricao,
      tipo,
      ativo = true,
      ordem = 0,
    } = await req.json();

    // Validar dados com Zod
    const dadosParaValidacao = {
      titulo,
      descricao,
      tipo,
      ativo,
      ordem: parseInt(ordem) || 0,
    };

    const validationResult = validateForm(
      questionarioSchema,
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

    const questionario = await prisma.questionario.create({
      data: validationResult.data,
    });

    return NextResponse.json({
      success: true,
      questionario,
      message: "Questionário criado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao criar questionário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar questionário
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

    const { id, titulo, descricao, tipo, ativo, ordem } = await req.json();

    // Validar dados com Zod
    const dadosParaValidacao = {
      id,
      titulo,
      descricao,
      tipo,
      ativo,
      ordem: ordem !== undefined ? parseInt(ordem) || 0 : undefined,
    };

    const validationResult = validateForm(
      questionarioUpdateSchema,
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

    const questionario = await prisma.questionario.update({
      where: { id: validationResult.data.id },
      data: {
        ...(validationResult.data.titulo && {
          titulo: validationResult.data.titulo,
        }),
        ...(validationResult.data.descricao !== undefined && {
          descricao: validationResult.data.descricao,
        }),
        ...(validationResult.data.tipo && { tipo: validationResult.data.tipo }),
        ...(validationResult.data.ativo !== undefined && {
          ativo: validationResult.data.ativo,
        }),
        ...(validationResult.data.ordem !== undefined && {
          ordem: validationResult.data.ordem,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      questionario,
      message: "Questionário atualizado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao atualizar questionário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir questionário
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

    await prisma.questionario.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Questionário excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir questionário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
