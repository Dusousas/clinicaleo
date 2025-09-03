"use client"

import React, { useState } from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        dataNascimento: '',
        whatsapp: '',
        senha: '',
        termos: false,
        privacidade: false,
        ofertas: false
    });

    const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContinuar = () => {
        console.log('Dados do formulário:', formData);
    };


    
    return (
        <>
            <section className='h-[calc(100vh-72px)] bg-gray-50 py-12 px-4'>
                <div className='max-w-md mx-auto'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                            Primeira vez aqui?
                        </h1>
                        <p className='text-gray-600 text-sm'>
                            Crie seu login e saiba o melhor tratamento para sua queda capilar.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {/* Nome e Sobrenome */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="sobrenome"
                                    placeholder="Sobrenome"
                                    value={formData.sobrenome}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            <p className='text-xs text-gray-500 mt-1'>
                                Todo contato com o médico será feito através do email.
                            </p>
                        </div>

                        {/* Data de Nascimento */}
                        <div>
                            <input
                                type="text"
                                name="dataNascimento"
                                placeholder="Data de nascimento (DD/MM/AAAA)"
                                value={formData.dataNascimento}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <input
                                type="tel"
                                name="whatsapp"
                                placeholder="Whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            <p className='text-xs text-gray-500 mt-1'>
                                O nosso time de suporte poderá entrar em contato pelo Whatsapp
                            </p>
                        </div>

                        {/* Senha */}
                        <div>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Senha"
                                value={formData.senha}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className='space-y-3 mt-6'>
                            <label className='flex items-start space-x-3 cursor-pointer'>
                                <input
                                    type="checkbox"
                                    name="termos"
                                    checked={formData.termos}
                                    onChange={handleInputChange}
                                    className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <span className='text-sm text-gray-700 leading-relaxed'>
                                    Eu concordo com os{' '}
                                    <span className='text-red-400 underline cursor-pointer hover:text-red-500'>
                                        Termos & Condições
                                    </span>{' '}
                                    e{' '}
                                    <span className='text-red-400 underline cursor-pointer hover:text-red-500'>
                                        Política de Privacidade
                                    </span>
                                </span>
                            </label>

                            <label className='flex items-start space-x-3 cursor-pointer'>
                                <input
                                    type="checkbox"
                                    name="privacidade"
                                    checked={formData.privacidade}
                                    onChange={handleInputChange}
                                    className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <span className='text-sm text-gray-700 leading-relaxed'>
                                    Eu concordo com a coleta e tratamento dos meus dados conforme{' '}
                                    <span className='text-red-400 underline cursor-pointer hover:text-red-500'>
                                        Política de Proteção de Dados
                                    </span>
                                </span>
                            </label>

                            <label className='flex items-start space-x-3 cursor-pointer'>
                                <input
                                    type="checkbox"
                                    name="ofertas"
                                    checked={formData.ofertas}
                                    onChange={handleInputChange}
                                    className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <span className='text-sm text-gray-700 leading-relaxed'>
                                    Tenha acesso{' '}
                                    <span className='text-blue-600 font-medium'>exclusivo</span>{' '}
                                    a brindes, descontos e ofertas especiais
                                </span>
                            </label>
                        </div>

                        {/* Botão Continuar */}
                        <button
                            type="button"
                            onClick={handleContinuar}
                            className='w-full bg-gray-300 text-gray-600 py-4 rounded-md font-bold text-sm tracking-wide mt-8 hover:bg-gray-400 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={!formData.termos || !formData.privacidade}
                        >
                            CONTINUAR
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}