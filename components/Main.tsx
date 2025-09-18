import Link from 'next/link';
import React from 'react';

export default function Main() {
    return (
        <>
            <section className='bg-white h-[60vh]'>
                <div className='maxW flex items-center h-full'>
                    <article className='lg:w-1/2'>
                        <h1 className='text-[#212529] uppercase font-Quicksand font-bold text-center text-4xl lg:text-left lg:text-6xl'>Consulta via chat, em minutos!</h1>
                        <p className='text-gray-600 mt-4 text-center lg:text-left'>Sem precisar ligar a câmera ou agendar.</p>
                        <div className="mt-10 flex justify-center lg:justify-start">
                            <a className="bg-Azul text-white px-10 py-4 rounded-2xl font-Quicksand tracking-wider uppercase font-semibold" href="/questionario">Começar tratamento</a>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
} 
