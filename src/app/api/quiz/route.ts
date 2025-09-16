import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// Função para formatar respostas do quiz
function formatarRespostasQuiz(
  responses: Record<string, unknown>
): Array<{ pergunta: string; resposta: string }> {
  if (!responses) return [];

  // Se responses tem a propriedade 'answers', usar ela
  if (responses.answers && Array.isArray(responses.answers)) {
    return responses.answers.map((answer: unknown, index: number) => {
      // Se answer é um objeto com a propriedade 'answer', extrair ela
      if (typeof answer === "object" && answer !== null && "answer" in answer) {
        const answerObj = answer as { answer: string };
        return {
          pergunta: `Pergunta ${index + 1}`,
          resposta: answerObj.answer,
        };
      }
      // Caso contrário, converter para string
      return {
        pergunta: `Pergunta ${index + 1}`,
        resposta: String(answer),
      };
    });
  }

  if (Array.isArray(responses)) {
    return responses.map((answer: unknown, index: number) => ({
      pergunta: `Pergunta ${index + 1}`,
      resposta:
        typeof answer === "object" ? JSON.stringify(answer) : String(answer),
    }));
  }

  if (typeof responses === "object") {
    return Object.entries(responses).map(([pergunta, resposta]) => ({
      pergunta: pergunta === "answers" ? "Respostas" : pergunta,
      resposta: Array.isArray(resposta)
        ? resposta
            .map((r) => (typeof r === "object" ? JSON.stringify(r) : String(r)))
            .join("; ")
        : typeof resposta === "object"
        ? JSON.stringify(resposta)
        : String(resposta),
    }));
  }

  return [];
}

// Função para criar avaliação clínica
async function criarAvaliacaoClinica(
  quizResponse: {
    id: string;
    quizType: string;
    responses: unknown;
    completedAt: Date | null;
  },
  userEmail: string
) {
  try {
    // Verificar se o usuário tem role de PACIENTE
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        dateOfBirth: true,
      },
    });

    if (!user || user.role !== "PACIENTE") {
      console.log(
        `❌ Usuário ${userEmail} não tem role PACIENTE - não criando avaliação`
      );
      return;
    }

    // Verificar se já existe uma avaliação para este quiz
    const existingAvaliacao = await prisma.$queryRaw`
      SELECT id FROM avaliacoes_clinicas 
      WHERE JSON_EXTRACT(dados_questionario, '$.quizResponseId') = ${quizResponse.id}
    `;

    if (Array.isArray(existingAvaliacao) && existingAvaliacao.length > 0) {
      console.log(`ℹ️ Já existe avaliação para quiz ${quizResponse.id}`);
      return;
    }

    // Usar o usuário autenticado diretamente (não precisamos de tabela pacientes)

    // Processar as respostas do quiz
    const responses = quizResponse.responses as Record<string, unknown>;
    const dadosQuestionario = {
      quizResponseId: quizResponse.id,
      quizType: quizResponse.quizType,
      respostas: formatarRespostasQuiz(responses),
      originalResponses: JSON.parse(JSON.stringify(responses)),
    };

    // Criar avaliação clínica
    const avaliacao = await prisma.avaliacoes_clinicas.create({
      data: {
        user_id: user.id,
        status: "aguardando_avaliacao",
        dados_questionario: JSON.parse(JSON.stringify(dadosQuestionario)),
        submetido_em: quizResponse.completedAt,
      },
    });

    console.log(
      `✅ Avaliação clínica criada para usuário ${user.name} - ID: ${avaliacao.id}`
    );
  } catch (error) {
    console.error("Erro ao criar avaliação clínica:", error);
  }
}

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

    // Criar avaliação clínica automaticamente
    await criarAvaliacaoClinica(quizResponse, session.user.email);

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

    // Buscar as perguntas do questionário para mapear com as respostas
    const questionario = await prisma.questionario.findFirst({
      where: {
        ativo: true,
      },
      include: {
        perguntas: {
          where: {
            ativa: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    // Mapear as respostas com as perguntas
    const quizResponsesWithQuestions = quizResponses.map((response) => {
      const responses = response.responses as Record<string, unknown>;
      if (
        responses.answers &&
        Array.isArray(responses.answers) &&
        questionario?.perguntas
      ) {
        const answersWithQuestions = responses.answers.map(
          (
            answer: { questionId?: number; answer?: string } | string,
            index: number
          ) => {
            const pergunta = questionario.perguntas[index];

            // Se answer é um objeto, extrair o valor do campo 'answer'
            if (typeof answer === "object" && answer !== null) {
              return {
                questionId: answer.questionId || index + 1,
                question: pergunta?.titulo || `Pergunta ${index + 1}`,
                answer: answer.answer || "",
              };
            }

            // Se answer é uma string, usar diretamente
            return {
              questionId: index + 1,
              question: pergunta?.titulo || `Pergunta ${index + 1}`,
              answer: String(answer),
            };
          }
        );

        return {
          ...response,
          responses: {
            ...responses,
            answers: answersWithQuestions,
          },
        };
      }
      return response;
    });

    return NextResponse.json({
      success: true,
      data: quizResponsesWithQuestions,
    });
  } catch (error) {
    console.error("Erro ao buscar respostas do quiz:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
