import React from "react";
import Question1 from "./components/Question1";
import ProtectedQuiz from "@/components/ProtectedQuiz";

export default function page() {
  return (
    <>
      <section className="bg-Azul/5">
        <div className="maxW">
          <ProtectedQuiz>
            <Question1 />
          </ProtectedQuiz>
        </div>
      </section>
    </>
  );
}
