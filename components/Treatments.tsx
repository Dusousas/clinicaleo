import React from 'react';

export default function Treatments() {
    return (
        <>
            <section className='py-20'>
                <div className='maxW'>
                    <h3 className="font-Quicksand uppercase tracking-widest font-semibold text-Laranja text-center">Sobrancelha de sobra</h3>
                    <h2 className='font-bold text-4xl text-textPrimary text-center'>Lorem ipsum dolor sit amet.</h2>

                    <article className='mt-10 flex justify-center gap-7'>
                        <div className='bg-Azul/5 shadow-lg lg:w-[350px] py-6 px-4 rounded-xl'>
                            <h5 className='text-Azul font-Quicksand uppercase text-sm font-semibold'>Verté Beauty</h5>
                            <p className='font-light mt-6 text-Azul text-sm'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa</p>
                        </div>

                        <div className='bg-Azul/5 shadow-lg lg:w-[350px] py-6 px-4 rounded-xl'>
                            <h5 className='text-Azul font-Quicksand uppercase text-sm font-semibold'>Verté Beauty</h5>
                            <p className='font-light mt-6 text-Azul text-sm'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa</p>
                        </div>

                        <div className='bg-Azul/5 shadow-lg lg:w-[350px] py-6 px-4 rounded-xl'>
                            <h5 className='text-Azul font-Quicksand uppercase text-sm font-semibold'>Verté Beauty</h5>
                            <p className='font-light mt-6 text-Azul text-sm'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa</p>
                        </div>

                        <div className='bg-Azul/5 shadow-lg lg:w-[350px] py-6 px-4 rounded-xl'>
                            <h5 className='text-Azul font-Quicksand uppercase text-sm font-semibold'>Verté Beauty</h5>
                            <p className='font-light mt-6 text-Azul text-sm'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa</p>
                        </div>
                    </article>

                    {/* Container para todos os cards */}
                    <div className='mt-20'>
                        {/* Primeira linha - dois cards */}
                        <div className='flex justify-between items-start gap-8'>
                            {/* Card 1 - esquerda */}
                            <article className='border-l-4 border-Verde py-4 flex-1'>
                                <h2 className='pl-6 font-semibold text-2xl'>1. Consultas online</h2>
                                <p className='pl-6 max-w-[700px] mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat eligendi architecto modi. Labore id nisi repellat, ea inventore dolores!</p>
                            </article>

                            {/* Card 2 - direita, mais baixo */}
                            <article className='border-r-4 text-right border-Verde py-4 flex-1 mt-16'>
                                <h2 className='pr-6 font-semibold text-2xl'>2. Tratamentos personalizados</h2>
                                <p className='pr-6 ml-auto max-w-[700px] mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat eligendi architecto modi. Labore id nisi repellat, ea inventore dolores!</p>
                            </article>
                        </div>
                                              {/* Primeira linha - dois cards */}
                        <div className='flex justify-between items-start gap-8'>
                            {/* Card 1 - esquerda */}
                            <article className='border-l-4 border-Verde py-4 flex-1'>
                                <h2 className='pl-6 font-semibold text-2xl'>3. Consultas online</h2>
                                <p className='pl-6 max-w-[700px] mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat eligendi architecto modi. Labore id nisi repellat, ea inventore dolores!</p>
                            </article>

                            {/* Card 2 - direita, mais baixo */}
                            <article className='border-r-4 text-right border-Verde py-4 flex-1 mt-16'>
                                <h2 className='pr-6 font-semibold text-2xl'>4. Tratamentos personalizados</h2>
                                <p className='pr-6 ml-auto max-w-[700px] mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat eligendi architecto modi. Labore id nisi repellat, ea inventore dolores!</p>
                            </article>
                        </div>
                        


                    </div>

                </div>
            </section>
        </>
    );
}