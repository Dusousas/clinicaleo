import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Buscar produtos
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const ativo = searchParams.get("ativo");

    const whereClause: {
      categoria?: string;
      ativo?: boolean;
    } = {};

    if (categoria && categoria !== "todas") {
      whereClause.categoria = categoria;
    }

    if (ativo !== null && ativo !== "todos") {
      whereClause.ativo = ativo === "true";
    }

    const produtos = await prisma.produto.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ produtos });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar produto
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nome, descricao, preco, categoria, estoque, observacoes } = data;

    if (!nome || !preco || !categoria) {
      return NextResponse.json(
        { error: "Nome, preço e categoria são obrigatórios" },
        { status: 400 }
      );
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,
        estoque: estoque ? parseInt(estoque) : 0,
        observacoes,
        ativo: true,
      },
    });

    return NextResponse.json({ produto });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar produto
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    // Converter tipos se necessário
    if (updateData.preco) {
      updateData.preco = parseFloat(updateData.preco);
    }
    if (updateData.estoque !== undefined) {
      updateData.estoque = parseInt(updateData.estoque);
    }

    const produto = await prisma.produto.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ produto });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir produto
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.produto.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
