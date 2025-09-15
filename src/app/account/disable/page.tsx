"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function DeactivateAccountPage() {
    const [password, setPassword] = useState('');
    const [reason, setReason] = useState('');
    const [confirmDeactivation, setConfirmDeactivation] = useState(false);
    const [errors, setErrors] = useState({
        password: false,
        reason: false,
        confirmDeactivation: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const deactivationReasons = [
        'Não uso mais o serviço',
        'Preocupações com privacidade',
        'Encontrei uma alternativa melhor',
        'Problemas técnicos',
        'Atendimento ao cliente insatisfatório',
        'Muito caro',
        'Outros'
    ];

    const validateForm = () => {
        const newErrors = {
            password: !password,
            reason: !reason,
            confirmDeactivation: !confirmDeactivation
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Aqui você faria a chamada para a API
                // const response = await deactivateAccount({
                //     password,
                //     reason
                // });
                
                // Simular delay da API
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                alert('Conta desativada com sucesso. Sentiremos sua falta!');
                // Redirecionar para página de login ou home
                router.push('/');
            } catch (error) {
                alert('Erro ao desativar conta. Verifique sua senha e tente novamente.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCancel = () => {
        router.back();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <section className='bg-Bg1 lg:pt-50 lg:pb-20'>
            <div className='maxW'>

                <div className='bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto'>
                    <div className='text-center mb-6'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className='text-2xl font-bold text-textPrimary mb-2'>Desativar Conta</h2>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                            Esta ação é <strong>irreversível</strong>. Todos os seus dados<br />
                            serão permanentemente removidos.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {/* Motivo da desativação */}
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Motivo da desativação *
                            </label>
                            <select
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    setErrors(prev => ({ ...prev, reason: false }));
                                }}
                                className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                    errors.reason ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Selecione um motivo</option>
                                {deactivationReasons.map((reasonOption, index) => (
                                    <option key={index} value={reasonOption}>
                                        {reasonOption}
                                    </option>
                                ))}
                            </select>
                            {errors.reason && (
                                <p className='text-red-500 text-xs mt-1'>Por favor, selecione um motivo</p>
                            )}
                        </div>

                        {/* Confirmação de senha */}
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Confirme sua senha *
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha para confirmar"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors(prev => ({ ...prev, password: false }));
                                    }}
                                    className={`w-full px-4 py-3 pr-10 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-xs mt-1'>Campo obrigatório</p>
                            )}
                        </div>

                        {/* Checkbox de confirmação */}
                        <div className='mb-6'>
                            <label className='flex items-start space-x-3 cursor-pointer'>
                                <input
                                    type="checkbox"
                                    checked={confirmDeactivation}
                                    onChange={(e) => {
                                        setConfirmDeactivation(e.target.checked);
                                        setErrors(prev => ({ ...prev, confirmDeactivation: false }));
                                    }}
                                    className={`mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 ${
                                        errors.confirmDeactivation ? 'border-red-500' : ''
                                    }`}
                                />
                                <span className='text-sm text-gray-700 leading-relaxed'>
                                    Eu entendo que esta ação é <strong>permanente</strong> e que todos os meus dados, 
                                    configurações e histórico serão <strong>completamente removidos</strong> 
                                    e não poderão ser recuperados.
                                </span>
                            </label>
                            {errors.confirmDeactivation && (
                                <p className='text-red-500 text-xs mt-1 ml-7'>Você deve confirmar para prosseguir</p>
                            )}
                        </div>

                        {/* Aviso adicional */}
                        <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6'>
                            <div className='flex'>
                                <AlertTriangle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                <div className='text-sm text-red-700'>
                                    <strong>Atenção:</strong> Após a desativação, você terá 30 dias para reativar sua conta 
                                    antes que os dados sejam permanentemente excluídos.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className='space-y-3'>
                        <button 
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full font-medium py-3 px-4 rounded-md transition duration-200 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                                    : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                            }`}
                        >
                            {isLoading ? 'Desativando...' : 'Desativar Conta'}
                        </button>
                        
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className={`w-full font-medium py-3 px-4 rounded-md transition duration-200 ${
                                isLoading 
                                    ? 'bg-gray-200 cursor-not-allowed text-gray-400' 
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer'
                            }`}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}