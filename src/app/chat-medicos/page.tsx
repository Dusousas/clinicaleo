import React from 'react';
import ChatMedico from './components/ChatMedico';

export default function page() {
    return (
        <>
            <section className='lg:pt-40 lg:pb-20'>
                <div className='maxW'>
                    <ChatMedico />
                </div>
            </section>
        </>
    );
}