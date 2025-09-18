"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizManager } from "@/lib/hooks/useQuizManager";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Você já teve problemas para obter ou manter uma ereção satisfatória o suficiente para o sexo?",
    options: [
      "Sim, toda vez",
      "Sim, mais da metade do tempo",
      "Sim, de vez em quando",
      "Sim, mas raramente",
    ],
  },
  {
    id: 2,
    question: "Com que frequência você sente desejo sexual?",
    options: [
      "Diariamente",
      "Algumas vezes por semana",
      "Uma vez por semana",
      "Raramente",
    ],
  },
  {
    id: 3,
    question:
      "Você tem dificuldade para manter o foco durante a atividade sexual?",
    options: ["Sempre", "Frequentemente", "Às vezes", "Nunca"],
  },
  {
    id: 4,
    question: "Como você avalia sua confiança sexual?",
    options: ["Muito alta", "Alta", "Média", "Baixa"],
  },
  {
    id: 5,
    question: "Você já procurou ajuda médica para questões sexuais?",
    options: [
      "Sim, recentemente",
      "Sim, há algum tempo",
      "Penso em procurar",
      "Nunca procurei",
    ],
  },
];

export default function Question1() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const { saveQuizResponses, isSubmitting } = useQuizManager({
    quizType: "sexual_health",
    onCompleted: () => {
      router.push('/tratamento');
    },
  });

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };

    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Quiz completo, salvar as respostas
        handleQuizCompletion(newAnswers);
      }
    }, 300);
  };

  const handleQuizCompletion = async (finalAnswers: {
    [key: number]: string;
  }) => {
    // Salvar as respostas no banco de dados
    const result = await saveQuizResponses(finalAnswers);

    if (!result.success) {
      console.error("Erro ao salvar respostas:", result.error);
      // Mesmo se houver erro, redirecionar para checkout
      // Você pode decidir se quer redirecionar mesmo com erro ou mostrar uma mensagem
      router.push('/checkout');
    }
    // Se sucesso, o redirect já será feito pelo onCompleted callback
  };

  // Mostrar loading enquanto está salvando e redirecionando
  if (isSubmitting) {
    return (
      <section className="h-[63vh] flex items-center justify-center w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09243C] mx-auto mb-4"></div>
          <p className="text-[#09243C] font-medium">Processando suas respostas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-[63vh] flex items-center justify-center w-full">
      <div className="maxW max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-center text-2xl font-Quicksand uppercase font-semibold text-[#09243C] mb-8 lg:w-[750px] lg:mx-auto">
            {currentQuestion.question}
          </h2>
        </div>

        <article className="space-y-4 flex flex-col justify-center items-center">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="p-4 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-[#09243C] hover:bg-gray-50 w-full transition-all duration-200 group lg:w-[750px] mx-auto"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-4 group-hover:border-[#09243C] transition-colors">
                  <div className="w-full h-full rounded-full bg-transparent group-hover:bg-[#09243C] group-hover:scale-50 transition-all duration-200"></div>
                </div>
                <span className="text-[#09243C] font-medium">{option}</span>
              </div>
            </button>
          ))}
        </article>

        {currentQuestionIndex > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="text-[#09243C] hover:underline text-sm cursor-pointer"
            >
              ← Voltar para pergunta anterior
            </button>
          </div>
        )}
      </div>
    </section>
  );
}