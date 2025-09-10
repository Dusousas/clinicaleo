"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../../../data/centralAjuda.json";

export default function Page() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <section className="bg-gray-50 lg:px-12 p-4 lg:pt-34">
      {/* Hero */}
      <div className="bg-[#09243C] rounded-xl">
        <div className="relative z-10 max-w-4xl pt-10 pb-4 mx-auto px-4 text-center">
          <h1 className="font-bold text-4xl text-white mb-8 font-Quicksand">
            Suas perguntas, respondidas!
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.categorias.map((category, index) => (
            <Link
              key={index}
              href={`/central-ajuda/${category.slug}`}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center block"
            >
              {/* Ícone da categoria */}
              <div className="mb-4 flex justify-center">
                <Image
                  src={category.icon} 
                  alt={category.title}
                  width={48}
                  height={48}
                  className="mx-auto"
                />
              </div>

              <h3 className="font-semibold text-lg text-[#09243C]">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-3xl text-[#09243C] mb-8 text-center lg:text-left">
            Perguntas frequentes
          </h2>

          <div className="space-y-4 mb-16">
            {data.categorias.flatMap((category) =>
              category.faqs.map(
                (faq: { id: number; question: string; answer: string }) => {
                  const faqKey = `${category.slug}-${faq.id}`;
                  return (
                    <div
                      key={faqKey}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <button
                        className="w-full p-6 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(faqKey)}
                      >
                        <h3 className="font-medium text-[#09243C]">
                          {faq.question}
                        </h3>
                        <div
                          className={`transform transition-transform duration-300 ${
                            openFaq === faqKey ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openFaq === faqKey
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
