"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineGoogle } from 'react-icons/ai';
const Eye = AiOutlineEye;
const EyeOff = AiOutlineEyeInvisible;

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);
        //Requisição de login
        setTimeout(() => {
            console.log('Login tentativa:', { email, password, rememberMe });
            setIsLoading(false);
            //API de autenticação
        }, 1500);
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Login com Google');
            setIsLoading(false);
            //API Google OAuth
        }, 1000);
    };

    return (
        <section className="h-[calc(100vh-72px)]">
            <div className="maxW h-full flex justify-center items-center flex-col">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative top-30">
                    <div className="bg-[#09243C] px-8 py-6 text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
                        <p className="text-blue-100 text-sm">Faça login para continuar</p>
                    </div>

                    <div className="p-8">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full mb-6 flex cursor-pointer items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group">
                            <AiOutlineGoogle className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-700">
                                {isLoading ? 'Conectando...' : 'Continuar com Google'}
                            </span>
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-500 bg-white px-3">ou</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <div className="relative">
                                    <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600">Lembrar de mim</span>
                                </label>
                                <Link
                                    
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors" href={'/forgot-password'}                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-6 bg-[#09243C] cursor-pointer text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    'Entrar'
                                )}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Não tem uma conta?{' '}
                                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    Cadastre-se aqui
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-33 text-center text-xs text-gray-500">
                    <p>Ao continuar, você concorda com nossos</p>
                    <div className="flex justify-center gap-4 mt-1">
                        <button className="hover:text-blue-600 transition-colors">Termos de Uso</button>
                        <span>•</span>
                        <button className="hover:text-blue-600 transition-colors">Política de Privacidade</button>
                    </div>
                </div>
            </div>
        </section>
    );
}