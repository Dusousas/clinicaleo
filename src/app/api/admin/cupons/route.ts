import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TipoCupom } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Buscar cupons
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ativo = searchParams.get("ativo");

    const whereClause: {
      ativo?: boolean;
    } = {};

    if (ativo !== null && ativo !== "todos") {
      whereClause.ativo = ativo === "true";
    }

    const cupons = await prisma.cupom.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ cupons });
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar cupom
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { codigo, desconto, tipo, dataExpiracao, usoMaximo, observacoes } =
      data;

    if (!codigo || !desconto || !tipo || !dataExpiracao) {
      return NextResponse.json(
        {
          error: "Código, desconto, tipo e data de expiração são obrigatórios",
        },
        { status: 400 }
      );
    }

    // Verificar se o código já existe
    const existingCupom = await prisma.cupom.findUnique({
      where: { codigo },
    });

    if (existingCupom) {
      return NextResponse.json(
        { error: "Código do cupom já existe" },
        { status: 400 }
      );
    }

    const cupom = await prisma.cupom.create({
      data: {
        codigo: codigo.toUpperCase(),
        desconto: parseFloat(desconto),
        tipo: tipo as TipoCupom,
        dataExpiracao: new Date(dataExpiracao),
        usoMaximo: usoMaximo ? parseInt(usoMaximo) : 0,
        observacoes,
        ativo: true,
        usosAtuais: 0,
      },
    });

    return NextResponse.json({ cupom });
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar cupom
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    // Converter tipos se necessário
    if (updateData.desconto) {
      updateData.desconto = parseFloat(updateData.desconto);
    }
    if (updateData.usoMaximo !== undefined) {
      updateData.usoMaximo = parseInt(updateData.usoMaximo);
    }
    if (updateData.usosAtuais !== undefined) {
      updateData.usosAtuais = parseInt(updateData.usosAtuais);
    }
    if (updateData.dataExpiracao) {
      updateData.dataExpiracao = new Date(updateData.dataExpiracao);
    }
    if (updateData.codigo) {
      updateData.codigo = updateData.codigo.toUpperCase();
    }

    const cupom = await prisma.cupom.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ cupom });
  } catch (error) {
    console.error("Erro ao atualizar cupom:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir cupom
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.cupom.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir cupom:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
