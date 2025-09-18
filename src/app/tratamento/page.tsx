import React from 'react';
import Tratamento from './components/Tratamento';

export default function page() {
    return (
        <>
            <section className='bg-Azul/5 py-20'>
                <div className='maxW flex flex-col h-full items-center  justify-center'>
                    <Tratamento />
                </div>
            </section>
        </>
    );
}