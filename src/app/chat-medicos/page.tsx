import React from 'react';
import ChatMedico from './components/ChatMedico';

export default function page() {
    return (
        <>
            <section className='py-20'>
                <div className='maxW'>
                    <ChatMedico />
                </div>
            </section>
        </>
    );
}