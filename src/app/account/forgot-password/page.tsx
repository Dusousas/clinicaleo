"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const router = useRouter();

    const validatePassword = (password: string) => {
        // Validação básica: pelo menos 8 caracteres
        return password.length >= 8;
    };

    const validateForm = () => {
        const newErrors = {
            currentPassword: !currentPassword,
            newPassword: !validatePassword(newPassword),
            confirmPassword: newPassword !== confirmPassword
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                // Aqui você faria a chamada para a API
                // const response = await updatePassword({
                //     currentPassword,
                //     newPassword
                // });
                
                alert('Senha alterada com sucesso!');
                // Redirecionar para o perfil ou dashboard
                router.push('/profile');
            } catch (error) {
                alert('Erro ao alterar senha. Verifique sua senha atual.');
            }
        }
    };

    const handleCancel = () => {
        router.back(); // Volta para a página anterior
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <section className='bg-Azul/5 flex items-center justify-center py-20 px-4'>
            <div className='w-full maxW'>
                <div className='bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto'>
                    <h2 className='text-2xl font-bold text-textPrimary text-center mb-2'>Alterar Senha</h2>
                    <p className='text-gray-600 text-center mb-8 text-sm leading-relaxed'>
                        Digite sua senha atual e escolha uma nova senha<br />para sua conta
                    </p>

                    <div className='space-y-4'>
                        {/* Senha Atual */}
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Senha Atual
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    placeholder="Digite sua senha atual"
                                    value={currentPassword}
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, currentPassword: false }));
                                    }}
                                    className={`w-full px-4 py-3 pr-10 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                >
                                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <p className='text-red-500 text-xs mt-1'>Campo obrigatório</p>
                            )}
                        </div>

                        {/* Nova Senha */}
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Nova Senha
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="Digite sua nova senha"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, newPassword: false }));
                                    }}
                                    className={`w-full px-4 py-3 pr-10 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                >
                                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className='text-red-500 text-xs mt-1'>A senha deve ter pelo menos 8 caracteres</p>
                            )}
                        </div>

                        {/* Confirmar Nova Senha */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Confirmar Nova Senha
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Confirme sua nova senha"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, confirmPassword: false }));
                                    }}
                                    className={`w-full px-4 py-3 pr-10 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-xs mt-1'>As senhas não coincidem</p>
                            )}
                        </div>
                    </div>

                    {/* Botões */}
                    <div className='space-y-3'>
                        <button 
                            onClick={handleSubmit}
                            className='w-full bg-Azul text-white font-medium py-3 px-4 cursor-pointer rounded-md transition duration-200'
                        >
                            Alterar Senha
                        </button>
                        
                        <button
                            onClick={handleCancel}
                            className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 cursor-pointer rounded-md transition duration-200'
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}