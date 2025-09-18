import React from 'react';

export default function Creators() {
    return (
        <>
            <section className='pt-20'>
                <div className='maxW'>
                    <h3 className="font-Quicksand uppercase tracking-widest text-center font-semibold text-Laranja">Creators</h3>
                    <h1 className="font-Quicksand font-bold text-5xl text-textPrimary text-center">Quem já usa Verté Beauty</h1>

                    <div className='flex flex-col justify-center gap-10 mt-10 lg:flex-row'>
                        <img className='rounded-2xl lg:w-[30%] object-cover' src="/h1-13.webp" alt="" />
                        <img className='rounded-2xl lg:w-[30%] object-cover' src="/h1-13.webp" alt="" />
                        <img className='rounded-2xl lg:w-[30%] object-cover' src="/h1-13.webp" alt="" />
                    </div>
                </div>
            </section>
        </>
    );
}