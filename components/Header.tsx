import React from 'react';
import Navbar from './subcomponents/Navbar';
import Login from './subcomponents/Login';

export default function Header() {
    return (
        <>
            <header className='bg-Azul py-6'>
                <div className='maxW flex items-center justify-between'>
                    <div className='w-1/3'>
                        <a className='text-3xl uppercase text-Verde font-semibold font-Quicksand italic' href="/">Verté</a>
                    </div>

                    <div className=' flex justify-center items-center lg:w-1/3'>
                        <Navbar />
                    </div>

                    <div className='hidden lg:w-1/3 lg:flex lg:justify-end'>
                        <Login />
                    </div>
                </div>
            </header>
        </>
    );
}