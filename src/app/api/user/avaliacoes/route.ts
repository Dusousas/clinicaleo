import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

interface QuestionarioData {
  medicamento?: string;
  respostas?:
    | Array<{ pergunta: string; resposta: string }>
    | Record<string, string>;
  [key: string]: unknown;
}

// Função para mapear status do banco para o frontend
function mapStatus(status: string): "pendente" | "aprovado" | "negado" {
  switch (status) {
    case "aguardando_avaliacao":
    case "em_analise":
    case "requer_esclarecimento":
      return "pendente";
    case "aprovada":
      return "aprovado";
    case "negada":
      return "negado";
    default:
      return "pendente";
  }
}

// GET - Buscar avaliações do usuário logado
export async function GET() {
  try {
    // Verificar se o usuário está autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login para acessar." },
        { status: 401 }
      );
    }

    console.log(`🔍 Buscando avaliações do usuário ${session.user.id}...`);

    const avaliacoes = await prisma.avaliacoes_clinicas.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        medicos: {
          select: {
            id: true,
            nome_completo: true,
          },
        },
      },
      orderBy: {
        submetido_em: "desc",
      },
    });

    console.log(`📊 Encontradas ${avaliacoes.length} avaliações do usuário`);

    // Transformar os dados para o formato esperado pelo frontend
    const avaliacoesFormatadas = avaliacoes.map((avaliacao) => {
      const dadosQuestionario =
        avaliacao.dados_questionario as QuestionarioData;

      return {
        id: avaliacao.id.toString(),
        status: mapStatus(avaliacao.status),
        statusOriginal: avaliacao.status,
        medicamento: dadosQuestionario?.medicamento || "Não especificado",
        respostas: dadosQuestionario?.respostas || [],
        caminhoFoto: avaliacao.caminho_foto,
        motivoNegativa: avaliacao.motivo_negativa,
        notasMedicas: avaliacao.notas_medicas,
        submetidoEm: avaliacao.submetido_em,
        avaliadoEm: avaliacao.avaliado_em,
        medico: avaliacao.medicos
          ? {
              id: avaliacao.medicos.id.toString(),
              nome: avaliacao.medicos.nome_completo,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      data: avaliacoesFormatadas,
    });
  } catch (error) {
    console.error("Erro ao buscar avaliações do usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
