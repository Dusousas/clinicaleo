import React from 'react';
import ChatAdmin from './components/ChatAdmin';

export default function page() {
    return (
        <>
            <section className='lg:pt-40 lg:pb-20'>
                <div className='maxW'>
                    <ChatAdmin />
                </div>
            </section>
        </>
    );
}