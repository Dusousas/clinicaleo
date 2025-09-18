import Link from 'next/link';
import React from 'react';

export default function Presentation() {
    return (
        <>
            <section className='h-[63vh] flex items-center justify-center w-full'>
                <div className='maxW'>
                    <h2 className='text-center text-2xl font-Quicksand uppercase font-semibold'>Vamos fazer algumas perguntas para encontrar seu plano ideal</h2>
                    <p className='text-center text-sm mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                    <article className='mt-10 flex flex-col gap-y-6 items-center justify-center'>
                        <div className='flex items-center gap-2 lg:gap-4'>

                            <div className='bg-Azul w-6 h-6 text-sm rounded-full flex justify-center items-center lg:h-10 lg:w-10'>
                                <h3 className='text-white font-semibold'>1</h3>
                            </div>
                            <div className='flex justify-between text-sm rounded-2xl font-Quicksand font-semibold bg-white py-4 px-4 lg:w-[400px] lg:text-medium'>
                                <h3 className='text-Azul'>Como está sua sobrancelha?</h3>
                            </div>
                        </div>


                    </article>
                    <p className='text-sm font-Quicksand mx-auto mt-6 text-center max-w-[500px]'>Li e concordo com o <Link className='underline' href="/termos">Termo de Consentimento para Telessaúde</Link>, <Link className='underline' href="/politica-privacidade">Política de dados pessoais,</Link> <Link className='underline' href="/termos">Termos e condições de uso,</Link> autorizando a coleta e tratamento de meus dados pela MARCA.</p>
                    <div className="mt-10 flex justify-center">
                        <Link className="bg-Azul text-white px-10 py-4 rounded-2xl font-Quicksand tracking-wider uppercase font-semibold" href="/quiz">Sim, Eu concordo</Link>
                    </div>
                </div>
            </section>
        </>
    );
}