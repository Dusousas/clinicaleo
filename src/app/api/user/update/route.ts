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
    const {
      name,
      dateOfBirth,
      whatsapp,
      cpf,
      address,
      number,
      complement,
      city,
      state,
      zipCode,
      acceptsOffers,
      image,
    } = body;

    // Converte a data de nascimento para DateTime se fornecida
    let parsedDateOfBirth = null;
    if (dateOfBirth) {
      parsedDateOfBirth = new Date(dateOfBirth);
    }

    // Atualiza o usuário com as informações
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(name && { name }),
        dateOfBirth: parsedDateOfBirth,
        whatsapp: whatsapp || null,
        cpf: cpf || null,
        address: address || null,
        number: number || null,
        complement: complement || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        acceptsOffers: acceptsOffers || false,
        ...(image && { image }),
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
        cpf: updatedUser.cpf,
        address: updatedUser.address,
        number: updatedUser.number,
        complement: updatedUser.complement,
        city: updatedUser.city,
        state: updatedUser.state,
        zipCode: updatedUser.zipCode,
        acceptsOffers: updatedUser.acceptsOffers,
        image: updatedUser.image,
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
