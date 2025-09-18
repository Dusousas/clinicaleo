import React from 'react';
import About from './components/About';
import Creators from './components/Creators';

export default function page() {
    return (
        <>
            <section className='py-20 bg-Azul/5'>
                <div className='maxW'>
                    <About />
                    <Creators />
                </div>
            </section>
        </>
    );
}