import React from 'react';
import Navbar from './subcomponents/Navbar';
import Login from './subcomponents/Login';

export default function Header() {
    return (
        <>
            <header className='lg:p-12 lg:absolute w-full'>
                <div className='flex items-center justify-between bg-[#09243C] lg:rounded-xl py-4 px-4'>
                    <div className='w-1/3'>
                        <a className='text-3xl uppercase text-white' href="/">Minhalogo</a>
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