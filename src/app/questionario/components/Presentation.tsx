import Link from 'next/link';
import React from 'react';

export default function Presentation() {
    return (
        <>
            <section className='h-[calc(100vh-72px)] flex items-center justify-center w-full'>
                <div className='maxW'>
                    <h2 className='text-center text-2xl font-Quicksand uppercase font-semibold text-[#09243C]'>Vamos fazer algumas perguntas para encontrar seu plano ideal</h2>
                    <p className='text-center text-sm mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>


                    {/*  */}
                    <article className='mt-10 flex flex-col gap-y-6 items-center justify-center'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-[#09243C] h-10 w-10 rounded-full flex justify-center items-center'>
                                <h3 className='text-white font-semibold'>1</h3>
                            </div>
                            <div className='flex justify-between rounded-2xl font-Quicksand font-semibold text-[#09243C] bg-white py-4 px-4 w-[400px]'>
                                <h2>Como está sua sobrancelha?</h2>
                                <h3 className='text-sm'>1 min</h3>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className='bg-[#09243C] h-10 w-10 rounded-full flex justify-center items-center'>
                                <h3 className='text-white font-semibold'>2</h3>
                            </div>
                            <div className='flex justify-between rounded-2xl font-Quicksand font-semibold text-[#09243C] bg-white py-4 px-4 w-[400px]'>
                                <h2>Como está sua sobrancelha?</h2>
                                <h3 className='text-sm'>1 min</h3>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className='bg-[#09243C] h-10 w-10 rounded-full flex justify-center items-center'>
                                <h3 className='text-white font-semibold'>3</h3>
                            </div>
                            <div className='flex justify-between rounded-2xl font-Quicksand font-semibold text-[#09243C] bg-white py-4 px-4 w-[400px]'>
                                <h2>Como está sua sobrancelha?</h2>
                                <h3 className='text-sm'>1 min</h3>
                            </div>
                        </div>
                    </article>
                    <p className='text-sm font-Quicksand mx-auto mt-6 text-center max-w-[500px]'>Li e concordo com o <a className='underline' href="">Termo de Consentimento para Telessaúde</a>, <a className='underline' href="">Política de dados pessoais,</a> <a className='underline' href="">Termos e condições de uso,</a> autorizando a coleta e tratamento de meus dados pela MARCA.</p>
                    <div className='flex justify-center mt-8'>
                        <Link className='bg-[#09243C] text-white px-8 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold' href="/quiz">Sim, eu concordo</Link>
                    </div>
                </div>
            </section>
        </>
    );
}