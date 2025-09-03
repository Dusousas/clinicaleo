"use client"
import Link from 'next/link';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { MdBolt } from 'react-icons/md';

export default function Treatments() {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const treatmentSteps = [
        {
            id: 1,
            title: "Fill In Our Medical Application",
            content: "Complete our detailed medical form so we can better understand your health history and specific needs. This process is confidential and secure."
        },
        {
            id: 2,
            title: "Review Your Family Medical History",
            content: "Our medical team will carefully analyze your family history to identify risk factors and develop a personalized treatment plan."
        },
        {
            id: 3,
            title: "Choose Between Our Care Programs",
            content: "We offer various specialized programs adapted to your needs. Our specialists will help you choose the best program for your situation."
        },
        {
            id: 4,
            title: "Introduce To Highly Qualified Doctors",
            content: "Meet our team of specialized doctors, all with extensive experience and internationally recognized qualifications."
        }
    ];

    const toggleAccordion = (id: number) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <section className='py-16 bg-gray-50'>
            <div className='maxW'>
                <div className='mb-12'>
                    <p className='text-sm uppercase font-bold text-[#09243C] text-center'>Como funciona?</p>
                    <h2 className='font-Quicksand font-semibold text-3xl uppercase text-center mt-2 text-[#09243C]'>Lorem ipsum dolor sit amet</h2>
                </div>

                <div className='flex flex-col justify-center gap-20 items-center lg:flex-row'>
                    <div className='flex justify-end lg:w-1/2'>
                        <img className='rounded-3xl' src="/h1-13.webp" alt="Doctor consultation" />
                    </div>

                    <div className='space-y-6 lg:w-1/2'>
                        <p className='text-sm uppercase font-bold text-[#09243C] text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur.</p>
                        <h2 className='font-Quicksand font-semibold text-3xl uppercase mt-2 text-[#09243C] text-center lg:text-left'>Lorem ipsum dolor sit.</h2>
                        {treatmentSteps.map((step) => (
                            <div key={step.id} className='bg-white rounded-2xl borde- border-[#09243C] overflow-hidden w-full outline'>
                                <button onClick={() => toggleAccordion(step.id)} className='w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'>
                                    <div className='flex items-center gap-2'>
                                        <div className='font-Quicksand text-sm font-black'>
                                            {step.id.toString().padStart(2, '0')}.
                                        </div>
                                        <span className='text-lg font-Quicksand font-semibold text-[#09243C]'>
                                            {step.title}
                                        </span>
                                    </div>
                                    <div className='flex-shrink-0 ml-4'>
                                        <IoAdd className='w-5 h-5 text-[#09243C]' />
                                    </div>
                                </button>

                                {openAccordion === step.id && (
                                    <div className='px-8 pb-6 pt-0'>
                                        <div className=''>
                                            <p className='text-gray-600 leading-relaxed'>
                                                {step.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className='flex justify-center mt-8 lg:justify-start'>
                            <Link className='bg-[#09243C] text-white px-6 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold' href="/questionario">Começar agora</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}