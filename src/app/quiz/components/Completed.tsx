import Link from "next/link";
import React from "react";
import { Loader2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
}

interface CompletedProps {
  questions: Question[];
  answers: { [key: number]: string };
  onReset: () => void;
  isSubmitting?: boolean;
}

export default function Completed({
  questions,
  answers,
  onReset,
  isSubmitting = false,
}: CompletedProps) {
  return (
    <section className="h-[calc(100vh-72px)] flex items-center justify-center w-full">
      <div className="maxW max-w-2xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-Quicksand uppercase font-semibold text-[#09243C] mb-6">
            Quiz Concluído!
          </h2>

          {isSubmitting ? (
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="mr-2 h-6 w-6 animate-spin text-[#09243C]" />
              <p className="text-[#09243C]">Salvando suas respostas...</p>
            </div>
          ) : (
            <p className="text-[#09243C] mb-8">
              Obrigado por responder todas as perguntas. Suas respostas foram
              registradas com sucesso!
            </p>
          )}

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4 text-[#09243C]">
              Resumo das suas respostas:
            </h3>
            {questions.map((q, index) => (
              <div key={q.id} className="mb-3 text-left">
                <p className="text-sm text-gray-600">Pergunta {index + 1}:</p>
                <p className="font-medium text-[#09243C]">{answers[q.id]}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onReset}
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#09243C] text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Refazer Quiz
            </button>
            <Link
              href="/"
              className={`px-6 py-3 bg-gray-200 text-[#09243C] rounded-lg hover:bg-gray-300 transition-all ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
