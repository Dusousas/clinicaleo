import React from 'react';

export default function About() {
    return (
        <>
            <div className='maxW'>
                <h3 className="font-Quicksand uppercase tracking-widest text-center font-semibold text-Laranja">Verté Beauty</h3>
                <h1 className="font-Quicksand font-bold text-5xl text-textPrimary text-center">Quem somos</h1>

                <article className='flex gap-20 mt-20'>

                    <div className='lg:w-1/2 flex justify-end'>
                        <img className='rounded-2xl w-[70%]' src="/h1-13.webp" alt="" />
                    </div>
                    <div className='lg:w-1/2 border-r-4 border-Verde'>
                        <h3 className="font-Quicksand uppercase tracking-widest font-semibold text-Laranja">Verté Beauty</h3>
                        <h1 className="font-Quicksand font-bold text-3xl text-textPrimary ">Lorem ipsum dolor sit amet.</h1>
                        <p className='mt-4 text-xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex nesciunt, perferendis ipsa autem odio repellat?</p>
                        <p className='mt-4 text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis voluptatibus cum quod voluptas nemo consequuntur natus explicabo quis nulla eos aut eum exercitationem consequatur, cumque expedita molestias porro! Possimus, similique!</p>
                        <p className='mt-2 text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis voluptatibus cum quod voluptas nemo consequuntur natus explicabo quis nulla eos aut eum exercitationem consequatur, cumque expedita molestias porro! Possimus, similique!</p>
                        <div className='flex gap-10'>
                            <div className='mt-8'>
                                <h3 className='text-Laranja font-Quicksand font-bold text-5xl'>150+</h3>
                                <h3 className='uppercase text-center text-Laranja tracking-widest'>Pacientes</h3>
                            </div>

                            <div className='mt-8'>
                                <h3 className='text-Laranja font-Quicksand text-center font-bold text-5xl'>150+</h3>
                                <h3 className='uppercase text-center text-Laranja tracking-widest'>Pacientes</h3>
                            </div>

                            <div className='mt-8'>
                                <h3 className='text-Laranja font-Quicksand text-center font-bold text-5xl'>150+</h3>
                                <h3 className='uppercase text-center text-Laranja tracking-widest'>Pacientes</h3>
                            </div>

                            <div className='mt-8'>
                                <h3 className='text-Laranja font-Quicksand text-center font-bold text-5xl'>150+</h3>
                                <h3 className='uppercase text-center text-Laranja tracking-widest'>Pacientes</h3>
                            </div>
                        </div>

                    </div>

                </article>
            </div>
        </>
    );
}