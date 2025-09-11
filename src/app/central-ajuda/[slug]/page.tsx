"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import data from "../../../../data/centralAjuda.json";

export default function FaqSlugPage() {
  const { slug } = useParams<{ slug: string }>(); // ✅ pega o slug no client
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const category = data.categorias.find(
    (cat: { slug: string }) => cat.slug === slug
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!category) {
    return (
      <section className="mx-auto px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Categoria não encontrada
        </h1>
        <p className="text-gray-700">Tente voltar para a central de ajuda.</p>
        <Link
          href="/central-ajuda"
          className="inline-block mt-6 px-6 py-2 bg-textPrimary text-white rounded-lg shadow hover:bg-[#123b63] transition"
        >
          Voltar para Central de Ajuda
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto pt-10 pb-10 px-4 lg:pt-40 lg:pb-20">
      {/* Botão de voltar */}
      <div className="mb-8">
        <Link
          href="/central-ajuda"
          className="inline-block px-5 py-2 bg-textPrimary text-white rounded-lg shadow hover:bg-[#123b63] transition"
        >
          ← Voltar para Central da Ajuda
        </Link>
      </div>

      <h2 className="text-3xl text-center uppercase font-bold mb-6">
        {category.title}
      </h2>

      <div className="space-y-4">
        {category.faqs.map(
          (
            faq: {
              id: React.Key;
              question: string;
              answer: string;
            },
            index: number
          ) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-md border border-gray-200"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4"
              >
                <h3 className="font-semibold text-lg text-texbg-textPrimary">
                  {faq.question}
                </h3>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  } text-texbg-textPrimary text-2xl`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
