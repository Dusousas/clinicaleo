import Link from 'next/link';
import React from 'react';

export default function Main() {
    return (
        <>
            <section className='lg:p-6'>
                <div className='bg-Primary h-[70vh] rounded-xl'>
                    <div className='maxW flex flex-col h-full justify-center items-center lg:flex-row lg:justify-start'>
                        <article className='lg:w-1/2'>
                            <h1 className='text-black uppercase text-6xl text-center lg:text-left'>Bem-vindo ao nosso site</h1>
                            <p className='text-black mt-4 text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam magnam hic voluptas eligendi enim? Deserunt.</p>
                    <div className='flex justify-center mt-8 lg:justify-start'>
                        <Link className='bg-[#09243C] text-white px-8 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold' href="/questionario">Começar agora</Link>
                    </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
} 