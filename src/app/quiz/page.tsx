import React from "react";
import QuizDinamico from "./components/QuizDinamico";
import ProtectedQuiz from "@/components/ProtectedQuiz";

export default function page() {
  return (
    <>
      <section className="bg-gray-100">
        <div className="maxW">
          <ProtectedQuiz>
            <QuizDinamico />
          </ProtectedQuiz>
        </div>
      </section>
    </>
  );
}
