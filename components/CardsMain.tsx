import React from 'react';
import { MdLocalPharmacy } from 'react-icons/md';

export default function CardsMain() {
    return (
        <>
            <section className='p-6'>
                <div className='bgCardsmain py-4 rounded-xl'>
                    <div className='maxW flex flex-col h-full items-center justify-center lg:flex-row'>

                        <div className='py-10 px-4 flex flex-col justify-center items-center lg:w-1/4 '>
                            <div className='h-20 w-20 flex items-center justify-center rounded-3xl bg-[#3E5365]'>
                                <MdLocalPharmacy className='text-3xl text-white' />
                            </div>
                            <div className='border-[#3E5365] border-[1px] w-[90%] my-6' />
                            <h1 className='text-lg uppercase text-center font-bold text-white font-Quicksand'>Formulações Exclusivas, Aprovadas pela Anvisa.</h1>
                            <p className='mt-4 text-center text-gray-400'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa.</p>
                        </div>

                        <div className='py-10 px-4 flex flex-col justify-center items-center lg:w-1/4 '>
                            <div className='h-20 w-20 flex items-center justify-center rounded-3xl bg-[#3E5365]'>
                                <MdLocalPharmacy className='text-3xl text-white' />
                            </div>
                            <div className='border-[#3E5365] border-[1px] w-[90%] my-6' />
                            <h1 className='text-lg uppercase text-center font-bold text-white font-Quicksand'>Formulações Exclusivas, Aprovadas pela Anvisa.</h1>
                            <p className='mt-4 text-center text-gray-400'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa.</p>
                        </div>

                        <div className='py-10 px-4 flex flex-col justify-center items-center lg:w-1/4 '>
                            <div className='h-20 w-20 flex items-center justify-center rounded-3xl bg-[#3E5365]'>
                                <MdLocalPharmacy className='text-3xl text-white' />
                            </div>
                            <div className='border-[#3E5365] border-[1px] w-[90%] my-6' />
                            <h1 className='text-lg uppercase text-center font-bold text-white font-Quicksand'>Formulações Exclusivas, Aprovadas pela Anvisa.</h1>
                            <p className='mt-4 text-center text-gray-400'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa.</p>
                        </div>

                        <div className='py-10 px-4 flex flex-col justify-center items-center lg:w-1/4 '>
                            <div className='h-20 w-20 flex items-center justify-center rounded-3xl bg-[#3E5365]'>
                                <MdLocalPharmacy className='text-3xl text-white' />
                            </div>
                            <div className='border-[#3E5365] border-[1px] w-[90%] my-6' />
                            <h1 className='text-lg uppercase text-center font-bold text-white font-Quicksand'>Formulações Exclusivas, Aprovadas pela Anvisa.</h1>
                            <p className='mt-4 text-center text-gray-400'>Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa.</p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
} 