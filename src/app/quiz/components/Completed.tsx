import Link from 'next/link';
import React from 'react';

interface Question {
    id: number;
    question: string;
}

interface CompletedProps {
    questions: Question[];
    answers: { [key: number]: string };
    onReset: () => void;
}

export default function Completed({ questions, answers, onReset }: CompletedProps) {
    return (
        <section className='h-[calc(100vh-72px)] flex items-center justify-center w-full'>
            <div className='maxW max-w-2xl mx-auto px-4'>
                <div className='text-center'>
                    <h2 className='text-2xl font-Quicksand uppercase font-semibold text-[#09243C] mb-6'>
                        TEste
                    </h2>
                    <p className='text-[#09243C] mb-8'>
                        Obrigado por responder todas as perguntas. Suas respostas foram registradas.
                    </p>
                    
                    <div className='bg-gray-50 p-6 rounded-lg mb-6'>
                        <h3 className='font-semibold mb-4 text-[#09243C]'>Resumo das suas respostas:</h3>
                        {questions.map((q, index) => (
                            <div key={q.id} className='mb-3 text-left'>
                                <p className='text-sm text-gray-600'>Pergunta {index + 1}:</p>
                                <p className='font-medium text-[#09243C]'>{answers[q.id]}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex gap-4 justify-center'>
                        <button 
                            onClick={onReset}
                            className='px-6 py-3 bg-[#09243C] text-white rounded-lg hover:bg-opacity-90 transition-all'
                        >
                            Refazer Quiz
                        </button>
                        <Link href="/" className='px-6 py-3 bg-gray-200 text-[#09243C] rounded-lg hover:bg-gray-300 transition-all'>
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}