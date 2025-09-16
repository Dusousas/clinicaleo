import { NextRequest, NextResponse } from "next/server";
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

    // Busca o usuário com todas as informações
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
        whatsapp: true,
        cpf: true,
        address: true,
        number: true,
        complement: true,
        city: true,
        state: true,
        zipCode: true,
        acceptsOffers: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
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

    const body = await request.json();
    const {
      name,
      email,
      dateOfBirth,
      whatsapp,
      cpf,
      address,
      number,
      complement,
      city,
      state,
      zipCode,
      acceptsPromotions,
      image,
    } = body;

    // Atualizar o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        whatsapp,
        cpf,
        address,
        number,
        complement,
        city,
        state,
        zipCode,
        acceptsOffers: acceptsPromotions, // Note: o campo no banco é acceptsOffers
        image,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
        whatsapp: true,
        cpf: true,
        address: true,
        number: true,
        complement: true,
        city: true,
        state: true,
        zipCode: true,
        acceptsOffers: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Perfil atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
