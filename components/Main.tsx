import Link from 'next/link';
import React from 'react';

export default function Main() {
    return (
        <>
            <section className='bg-white h-[60vh]'>
                <div className='maxW flex items-center h-full'>
                    <article className='lg:w-1/2'>
                        <h1 className='text-[#212529] uppercase text-6xl font-Quicksand font-bold text-center lg:text-left'>Consulta via chat, em minutos!</h1>
                        <p className='text-gray-600 mt-4 text-center lg:text-left'>Sem precisar ligar a câmera ou agendar.</p>
                        <div className="mt-10">
                            <a className="bg-Azul text-white px-10 py-4 rounded-2xl font-Quicksand tracking-wider uppercase font-semibold" href="/questionario">Começar tratamento</a>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
} 
