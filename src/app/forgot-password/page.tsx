"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordResetPage() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(newEmail === '' || validateEmail(newEmail));
    };

    const handleSubmit = () => {
        if (email && validateEmail(email)) {
            alert('Instruções enviadas para o seu e-mail!');
        } else {
            setIsEmailValid(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/login');
    };

    return (
        <section className='h-[calc(100vh-72px)] bg-gray-100 flex items-center justify-center px-4'>
            <div className='w-full maxW'>

                <div className='bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto lg:mt-25'>
                    <h1 className='text-2xl font-bold text-[#09243C] text-center mb-2'>Quer redefinir sua senha?</h1>
                    <p className='text-gray-600 text-center mb-8 text-sm leading-relaxed'>Não se preocupe. Enviaremos por e-mail as<br />instruções para redefinir sua senha</p>

                    <div className='mb-4'>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full px-4 py-3 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                !isEmailValid ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {!isEmailValid && (
                            <p className='text-red-500 text-xs mt-1'>E-mail inválido</p>
                        )}
                    </div>

                    <button onClick={handleSubmit}className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 cursor-pointer rounded-md transition duration-200 mb-6'>Redefinir senha</button>
                    <div className='text-center'>
                        <button
                            onClick={handleBackToLogin}
                            className='text-blue-600 hover:text-[#09243C] text-sm font-medium border-none uppercase bg-transparent cursor-pointer'>Voltar para login</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
