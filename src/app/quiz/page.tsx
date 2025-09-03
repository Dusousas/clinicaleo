import React from 'react';
import Question1 from './components/Question1';

export default function page() {
    return (
        <>
            <section className='bg-gray-100'>
                <div className='maxW'>
                    <Question1 />
                </div>
            </section>
        </>
    );
}