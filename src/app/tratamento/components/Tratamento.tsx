'use client';

import { Link } from 'lucide-react';
import React, { useState } from 'react';

export default function Tratamento() {
    const [selectedPlan, setSelectedPlan] = useState('6meses');

    const plans = [
        {
            id: '3meses',
            duration: '3 meses',
            price: 'R$ 102,43',
            priceDetail: '/mês',
            installment: 'R$ 146,33 a partir do 2º mês',
            savings: false
        },
        {
            id: '6meses',
            duration: '6 meses',
            price: 'R$ 92,19',
            priceDetail: '/mês',
            installment: 'R$ 131,70 a partir do 2º mês',
            savings: true,
            savingsText: 'Maior desconto'
        }
    ];

    const installmentPlans = [
        { installments: '1ª até 3ª', plan3: 'R$ 102,43', plan6: 'R$ 92,19' },
        { installments: '4ª até 6ª', plan3: 'R$ 146,33', plan6: 'R$ 92,19' },
        { installments: '7ª em diante', plan3: 'R$ 146,33', plan6: 'R$ 131,70' }
    ];

    const benefits = [
        {
            title: 'Receba seu tratamento em casa',
            description: 'A gestão da compra e entrega do tratamento é por nossa conta, sem nenhum custo adicional.'
        },
        {
            title: 'Se preocupe só em se cuidar',
            description: 'Nós cuidamos de tudo: te informamos sobre seu tratamento, datas de entregas e renovações.'
        },
        {
            title: 'Suporte Clínico ilimitado',
            description: 'Fale com um especialista pelo WhatsApp para dúvidas, mudanças ou avaliar seus resultados, sempre que quiser.'
        },
        {
            title: 'Planos Flexíveis',
            description: 'Você pode pausar, mudar a data de entrega ou cancelar quando precisar, sem complicações.'
        }
    ];

    return (
        <section className='h-full'>
            <div className='maxW mx-auto h-full'>
                <h2 className='font-Quicksand font-semibold text-3xl text-[#09243C] mb-12 text-center'>
                    Escolha a frequência do seu plano
                </h2>

                {/* Plan Selection Cards */}
                <div className='space-y-4 mb-12 max-w-[700px] mx-auto'>
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative p-6 border-2 rounded-lg cursor-pointer  transition-all ${
                                selectedPlan === plan.id
                                    ? 'border-[#FF6B6B] bg-white shadow-lg'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.savings && (
                                <div className='absolute -top-3 left-6 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium'>
                                    {plan.savingsText}
                                </div>
                            )}
                            
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedPlan === plan.id
                                            ? 'border-[#FF6B6B] bg-[#FF6B6B]'
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedPlan === plan.id && (
                                            <div className='w-2 h-2 bg-white rounded-full'></div>
                                        )}
                                    </div>
                                    <span className='font-semibold text-[#09243C] text-lg'>
                                        {plan.duration}
                                    </span>
                                </div>
                                
                                <div className='text-right'>
                                    <div className='text-2xl font-bold text-[#09243C]'>
                                        {plan.price}
                                        <span className='text-sm font-normal text-gray-600'>{plan.priceDetail}</span>
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        {plan.installment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Installments Comparison */}
                <div className='bg-white rounded-lg p-6 mb-12 shadow-sm max-w-[700px] mx-auto'>
                    <h3 className='font-semibold text-[#09243C] text-lg mb-6'>Compare as parcelas</h3>
                    
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b'>
                                    <th className='text-left py-3 text-gray-600 font-medium'>Parcelas</th>
                                    <th className='text-center py-3 text-gray-600 font-medium'>3 meses</th>
                                    <th className='text-center py-3 text-gray-600 font-medium'>6 meses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {installmentPlans.map((row, index) => (
                                    <tr key={index} className='border-b'>
                                        <td className='py-4 text-[#09243C] font-medium'>{row.installments}</td>
                                        <td className='py-4 text-center text-[#09243C] font-semibold'>{row.plan3}</td>
                                        <td className='py-4 text-center text-[#09243C] font-semibold'>{row.plan6}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <p className='text-sm text-gray-600 mt-4'>
                        *Desconto aplicado apenas na 1ª compra
                    </p>
                </div>

                {/* Benefits Section */}
                <div className='mb-4'>
                    <h3 className='font-Quicksand font-semibold text-2xl uppercase text-[#09243C]'>
                        Prático, flexível e sempre por perto
                    </h3>
                    
                    <div className='gap-6 mt-4'>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='flex space-x-4'>
                                <div className='flex-shrink-0'>
                                    <div className='w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center'>
                                        <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <h4 className='font-semibold text-[#09243C]'>{benefit.title}</h4>
                                    <p className='text-gray-600 text-sm leading-relaxed'>{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                    <div className='flex justify-center mt-8'>
                        <a href='/checkout' className='bg-[#09243C] cursor-pointer text-white px-8 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold'>Continuar</a>
                    </div>

            </div>
        </section>
    );
}