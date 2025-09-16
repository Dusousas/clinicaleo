import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, avaliacoes_clinicas_status } from "@/generated/prisma";

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

// Função para mapear status do frontend para o banco
function mapStatusToDb(status: string) {
  switch (status) {
    case "aprovado":
      return "aprovada";
    case "negado":
      return "negada";
    case "pendente":
    default:
      return "aguardando_avaliacao";
  }
}

// Função para formatar as respostas do questionário
function formatarRespostas(dadosQuestionario: QuestionarioData) {
  if (!dadosQuestionario || !dadosQuestionario.respostas) {
    return [];
  }

  // Se as respostas já estão no formato esperado
  if (Array.isArray(dadosQuestionario.respostas)) {
    return dadosQuestionario.respostas;
  }

  // Se as respostas estão em formato de objeto, converter para array
  if (typeof dadosQuestionario.respostas === "object") {
    return Object.entries(dadosQuestionario.respostas).map(
      ([pergunta, resposta]) => ({
        pergunta,
        resposta: String(resposta),
      })
    );
  }

  return [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    console.log("🔍 Buscando avaliações clínicas...");

    // Buscar todas as avaliações clínicas
    const whereClause =
      status && status !== "todos"
        ? { status: status as avaliacoes_clinicas_status }
        : {};

    console.log("🔍 Buscando avaliações clínicas no banco...");
    const avaliacoes = await prisma.avaliacoes_clinicas.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            whatsapp: true,
            dateOfBirth: true,
          },
        },
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

    console.log(`📊 Encontradas ${avaliacoes.length} avaliações clínicas`);

    // Transformar os dados para o formato esperado pelo frontend
    const consultasFormatadas = avaliacoes.map((avaliacao) => {
      const dadosQuestionario =
        avaliacao.dados_questionario as QuestionarioData;

      return {
        id: avaliacao.id.toString(),
        paciente: {
          nome: avaliacao.user.name,
          email: avaliacao.user.email,
          idade: avaliacao.user.dateOfBirth
            ? new Date().getFullYear() -
              new Date(avaliacao.user.dateOfBirth).getFullYear()
            : 0,
          telefone: avaliacao.user.whatsapp || "Não informado",
        },
        medicamento: dadosQuestionario?.medicamento || "A definir pelo médico",
        dataSubmissao:
          avaliacao.submetido_em?.toISOString() || new Date().toISOString(),
        status: mapStatus(avaliacao.status),
        respostas: formatarRespostas(dadosQuestionario),
        observacoes: avaliacao.notas_medicas || undefined,
        motivoNegativa: avaliacao.motivo_negativa || undefined,
        foto: avaliacao.caminho_foto || undefined,
        medico: avaliacao.medicos?.nome_completo || undefined,
        avaliadoEm: avaliacao.avaliado_em?.toISOString() || undefined,
      };
    });

    return NextResponse.json({ consultas: consultasFormatadas });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, observacoes, motivoNegativa, medicamento } =
      await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    // Se está atualizando medicamento, fazer uma atualização JSON específica
    if (medicamento !== undefined) {
      await prisma.$executeRaw`
        UPDATE avaliacoes_clinicas 
        SET dados_questionario = JSON_SET(COALESCE(dados_questionario, '{}'), '$.medicamento', ${medicamento})
        WHERE id = ${BigInt(id)}
      `;
    }

    // Preparar dados para atualização regular
    const updateData: {
      status?: avaliacoes_clinicas_status;
      avaliado_em?: Date;
      notas_medicas?: string | null;
      motivo_negativa?: string | null;
    } = {};

    // Se está atualizando status
    if (status) {
      updateData.status = mapStatusToDb(status) as avaliacoes_clinicas_status;
      updateData.avaliado_em = new Date();
    }

    // Se está atualizando observações
    if (observacoes !== undefined) {
      updateData.notas_medicas = observacoes || null;
    }

    // Se está atualizando motivo de negativa
    if (motivoNegativa !== undefined) {
      updateData.motivo_negativa = motivoNegativa || null;
    }

    // Fazer atualização dos campos regulares se necessário
    if (Object.keys(updateData).length > 0) {
      await prisma.avaliacoes_clinicas.update({
        where: {
          id: BigInt(id),
        },
        data: updateData,
      });
    }

    // Buscar dados atualizados para retornar
    const avaliacaoFinal = await prisma.avaliacoes_clinicas.findUnique({
      where: { id: BigInt(id) },
    });

    // Converter BigInt para string antes de retornar
    const avaliacaoParaRetorno = avaliacaoFinal
      ? {
          ...avaliacaoFinal,
          id: avaliacaoFinal.id.toString(),
          medico_id: avaliacaoFinal.medico_id?.toString() || null,
        }
      : null;

    return NextResponse.json({
      success: true,
      avaliacao: avaliacaoParaRetorno,
    });
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
