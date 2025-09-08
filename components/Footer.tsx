import React from 'react';

export default function Footer() {
    return (
        <>
            <section className='bg-[#09243C] py-6 text-white'>
                <div className='maxW'>
                    <article className='flex flex-col justify-between items-center lg:flex-row lg:px-40'>

                        <div className='flex flex-col lg:justify-start justify-center items-center lg:items-start'>
                            <a className='text-3xl uppercase text-white text-center' href="/">Minhalogo</a>
                            <div className='flex gap-4 mt-2'>
                                <a className='text-[10px] text-left' href="">Política de privacidade</a>
                                <a className='text-[10px] text-left' href="">Termos e condições</a>
                            </div>
                            <p className='text-[12px] mt-4 lg:max-w-[400px] text-center lg:text-left'>A Minhalogo não é uma farmácia. Todos produtos adquiridos são
                                manipulados pelas farmácias credenciadas, de acordo com as normas da Anvisa.</p>

                            <div className='mt-4'>
                                <img src="/icons/footer-image-1.png" alt="Logo" />
                            </div>
                        </div>

                        <div className='flex justify-end gap-4 mt-4 lg:mt-0'>
                            <a href=""><img src="/icons/instagram.png" alt="" /></a>
                            <a href=""><img src="/icons/facebook.png" alt="" /></a>
                        </div>

                    </article>

                    <article className='mt-8'>
                        <p className='text-center text-sm'>Copyright 2025 Minhalogo. Todos os direitos reservados.</p>
                    </article>
                </div>
            </section>
        </>
    );
}