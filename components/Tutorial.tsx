import Link from 'next/link';
import React from 'react';

export default function Tutorial() {
    return (
        <>
            <section className='py-10 lg:py-20'>
                <div className='maxW'>
                    <h2 className='font-Quicksand font-semibold text-3xl uppercase text-[#09243C] mb-12 text-center lg:text-left'>
                        Sobrancelhas perfeitas sem complicação
                    </h2>

                    <article className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-[#F8F7F6] rounded-lg shadow-lg py-8 px-6 hover:shadow-xl transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 bg-[#09243C] text-white rounded-full mb-4 font-bold uppercase text-xl font-Quicksand'>
                                1
                            </div>
                            <h3 className='font-Quicksand font-semibold text-xl text-[#09243C] mb-3 uppercase'>
                                Tutorial 1
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias.</p>
                        </div>

                        <div className='bg-[#F8F7F6] rounded-lg shadow-lg py-8 px-6 hover:shadow-xl transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 bg-[#09243C] text-white rounded-full mb-4 font-bold uppercase text-xl font-Quicksand'>
                                1
                            </div>
                            <h3 className='font-Quicksand font-semibold text-xl text-[#09243C] mb-3 uppercase'>
                                Tutorial 1
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias.</p>
                        </div>

                        <div className='bg-[#F8F7F6] rounded-lg shadow-lg py-8 px-6 hover:shadow-xl transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 bg-[#09243C] text-white rounded-full mb-4 font-bold uppercase text-xl font-Quicksand'>
                                1
                            </div>
                            <h3 className='font-Quicksand font-semibold text-xl text-[#09243C] mb-3 uppercase'>
                                Tutorial 1
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias.</p>
                        </div>
                    </article>

                    <div className='flex mt-8 justify-center'>
                        <Link className='bg-[#09243C] text-white px-6 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold' href="/questionario">Começar agora</Link>
                    </div>
                </div>
            </section>
        </>
    );
}