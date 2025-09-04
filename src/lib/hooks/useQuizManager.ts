import { useState } from "react";
import { toast } from "sonner";

interface UseQuizManagerProps {
  quizType: string;
  onCompleted?: () => void;
}

interface QuizResponse {
  questionId: number;
  answer: string;
}

export function useQuizManager({ quizType, onCompleted }: UseQuizManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveQuizResponses = async (responses: { [key: number]: string }) => {
    setIsSubmitting(true);

    try {
      // Converter o formato das respostas para um array mais estruturado
      const formattedResponses: QuizResponse[] = Object.entries(responses).map(
        ([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        })
      );

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizType,
          responses: {
            answers: formattedResponses,
            completedAt: new Date().toISOString(),
            totalQuestions: Object.keys(responses).length,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar respostas");
      }

      toast.success("Respostas salvas com sucesso!");

      if (onCompleted) {
        onCompleted();
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Erro ao salvar respostas:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao salvar respostas");
      }

      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserQuizResponses = async (specificQuizType?: string) => {
    try {
      const queryParam = specificQuizType || quizType;
      const response = await fetch(`/api/quiz?quizType=${queryParam}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar respostas");
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Erro ao buscar respostas:", error);
      return { success: false, error };
    }
  };

  return {
    saveQuizResponses,
    getUserQuizResponses,
    isSubmitting,
  };
}
