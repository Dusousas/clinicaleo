"use client";

import React, { useEffect, useState } from "react";
import { useQuizManager } from "@/lib/hooks/useQuizManager";
import ProtectedQuiz from "@/components/ProtectedQuiz";
import { Loader2 } from "lucide-react";

interface QuizResponse {
  id: string;
  quizType: string;
  responses: {
    answers: Array<{
      questionId: number;
      question?: string;
      answer: string;
    }>;
    completedAt: string;
    totalQuestions: number;
  };
  completedAt: string;
}

export default function QuizResultsPage() {
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserQuizResponses } = useQuizManager({ quizType: "" });

  useEffect(() => {
    const loadQuizResponses = async () => {
      try {
        const result = await getUserQuizResponses("sexual_health");
        if (result.success) {
          setQuizResponses(result.data);
        }
      } catch (error) {
        console.error("Erro ao carregar respostas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizResponses();
  }, [getUserQuizResponses]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <ProtectedQuiz>
        <section className="h-[calc(100vh-72px)] flex items-center justify-center w-full">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#09243C] mx-auto mb-4" />
            <p className="text-[#09243C]">Carregando suas respostas...</p>
          </div>
        </section>
      </ProtectedQuiz>
    );
  }

  return (
    <ProtectedQuiz>
      <section className="min-h-[calc(100vh-72px)] bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-Quicksand uppercase font-semibold text-[#09243C] mb-4">
              Suas Respostas do Quiz
            </h1>
            <p className="text-gray-600">
              Aqui você pode visualizar todas as suas respostas dos
              questionários realizados.
            </p>
          </div>

          {quizResponses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Você ainda não respondeu nenhum questionário.
              </p>
              <a
                href="/quiz"
                className="inline-block px-6 py-3 bg-[#09243C] text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                Fazer Questionário
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {quizResponses.map((response) => (
                <div
                  key={response.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#09243C] mb-1">
                        Quiz de Saúde Sexual
                      </h3>
                      <p className="text-sm text-gray-500">
                        Respondido em: {formatDate(response.completedAt)}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Completo
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Total de perguntas respondidas:{" "}
                      {response.responses.totalQuestions}
                    </p>

                    {response.responses.answers.map((answer) => (
                      <div
                        key={answer.questionId}
                        className="border-l-4 border-[#09243C] pl-4"
                      >
                        <p className="text-sm text-gray-600">
                          {answer.question || `Pergunta ${answer.questionId}`}:
                        </p>
                        <p className="font-medium text-[#09243C]">
                          {answer.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ProtectedQuiz>
  );
}
