import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma";
import { UserRole, isAdmin } from "@/lib/utils/roles";

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

    // Verificar se o usuário é admin
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!currentUser || !isAdmin(currentUser.role as UserRole)) {
      return NextResponse.json(
        {
          error: "Acesso negado. Apenas administradores podem listar usuários.",
        },
        { status: 403 }
      );
    }

    // Listar todos os usuários com seus roles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    // Verificar se o usuário é admin
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!currentUser || !isAdmin(currentUser.role as UserRole)) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem alterar roles." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: "userId e newRole são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o role é válido
    if (!Object.values(UserRole).includes(newRole)) {
      return NextResponse.json({ error: "Role inválido" }, { status: 400 });
    }

    // Não permitir que o admin altere seu próprio role
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Você não pode alterar seu próprio role" },
        { status: 400 }
      );
    }

    // Atualizar o role do usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Role atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
