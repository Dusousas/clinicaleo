"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Calendar, Camera, ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        cpf: '', // <-- Novo campo
        address: '',
        city: '',
        state: '',
        zipCode: '',
        bio: ''
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        dateOfBirth: false,
        cpf: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Simular carregamento dos dados do usuário
    useEffect(() => {
        const mockUserData = {
            firstName: 'Ricardo',
            lastName: 'Santos',
            email: 'ricardo.santos@email.com',
            phone: '(11) 99999-9999',
            dateOfBirth: '1985-03-20',
            cpf: '123.456.789-09',
            address: 'Rua Oscar Freire, 456',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01426-001',
            bio: 'Executivo focado em resultados e bem-estar. Apaixonado por tecnologia, fitness e desenvolvimento pessoal.'
        };
        setFormData(mockUserData);
    }, []);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10;
    };

    const validateCPF = (cpf: string) => {
        const cleanCPF = cpf.replace(/\D/g, '');
        return cleanCPF.length === 11;
    };

    const validateForm = () => {
        const newErrors = {
            firstName: !formData.firstName.trim(),
            lastName: !formData.lastName.trim(),
            email: !validateEmail(formData.email),
            phone: !validatePhone(formData.phone),
            dateOfBirth: !formData.dateOfBirth,
            cpf: !validateCPF(formData.cpf)
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Perfil atualizado com sucesso!');
                router.push('/account');
            } catch (error) {
                alert('Erro ao atualizar perfil. Tente novamente.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className='min-h-screen bg-Azul/5'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-4xl mx-auto px-6 py-6'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                            <button 
                                onClick={handleBack}
                                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h2 className='text-3xl font-bold text-gray-900'>Editar Perfil</h2>
                                <p className='text-gray-700 text-sm mt-1'>Mantenha suas informações atualizadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-6 py-8'>
                <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden'>
                    
                    {/* Profile Image Section */}
                    <div className='bg-gradient-to-r from-Azul to-Azul/40 px-8 py-12'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='relative mb-6'>
                                <div className='w-32 h-32 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/20'>
                                    {profileImage ? (
                                        <img 
                                            src={profileImage} 
                                            alt="Profile" 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <User className="w-12 h-12 text-white/60" />
                                    )}
                                </div>
                                <label className='absolute bottom-2 right-2 bg-white rounded-full p-3 cursor-pointer hover:bg-gray-50 transition-colors shadow-lg'>
                                    <Camera className="w-5 h-5 text-gray-700" />
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload}
                                        className='hidden'
                                    />
                                </label>
                            </div>
                            <h3 className='text-white text-xl font-semibold mb-2'>
                                {formData.firstName} {formData.lastName}
                            </h3>
                            <p className='text-white text-sm'>Atualize sua foto de perfil</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className='p-8'>
                        <div className='space-y-8'>
                            
                            {/* Personal Information */}
                            <div>
                                <h3 className='text-lg font-semibold text-textPrimary mb-6'>Informações Pessoais</h3>
                                
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Nome *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite seu nome"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className={`w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                                errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        {errors.firstName && (
                                            <p className='text-red-600 text-sm mt-2'>Nome é obrigatório</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Sobrenome *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Digite seu sobrenome"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className={`w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                                errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        {errors.lastName && (
                                            <p className='text-red-600 text-sm mt-2'>Sobrenome é obrigatório</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className='text-lg font-semibold text-gray-900 mb-6'>Contato</h3>
                                
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Email *
                                        </label>
                                        <div className='relative'>
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="seu@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`w-full pl-12 pr-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className='text-red-600 text-sm mt-2'>Email inválido</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Telefone *
                                        </label>
                                        <div className='relative'>
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                placeholder="(11) 99999-9999"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className={`w-full pl-12 pr-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className='text-red-600 text-sm mt-2'>Telefone inválido</p>
                                        )}
                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                                        Data de Nascimento *
                                    </label>
                                    <div className='relative max-w-xs'>
                                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                                errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    {errors.dateOfBirth && (
                                        <p className='text-red-600 text-sm mt-2'>Data de nascimento é obrigatória</p>
                                    )}
                                </div>

                                <div className='mt-6'>
                                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                                        CPF *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="000.000.000-00"
                                        value={formData.cpf}
                                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                                        className={`w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${
                                            errors.cpf ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    />
                                    {errors.cpf && (
                                        <p className='text-red-600 text-sm mt-2'>CPF inválido</p>
                                    )}
                                </div>
                            </div>

                            {/* Address Information */}
                            <div>
                                <h3 className='text-lg font-semibold text-gray-900 mb-6'>Endereço</h3>
                                
                                <div className='space-y-6'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Endereço
                                        </label>
                                        <div className='relative'>
                                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Rua, número, complemento"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className='w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent hover:border-gray-300 transition-all'
                                            />
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-3'>
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="São Paulo"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className='w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent hover:border-gray-300 transition-all'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-3'>
                                                Estado
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="SP"
                                                value={formData.state}
                                                onChange={(e) => handleInputChange('state', e.target.value)}
                                                className='w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent hover:border-gray-300 transition-all'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-3'>
                                                CEP
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="01234-567"
                                                value={formData.zipCode}
                                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                                className='w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent hover:border-gray-300 transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='bg-gray-50 px-8 py-6 border-t border-gray-200'>
                        <div className='flex flex-col-reverse sm:flex-row justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-4'>
                            <button
                                onClick={handleBack}
                                disabled={isLoading}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                    isLoading 
                                        ? 'bg-gray-200 cursor-not-allowed text-gray-400' 
                                        : 'bg-white border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                }`}
                            >
                                Cancelar
                            </button>
                            
                            <button 
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                                    isLoading 
                                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                                        : 'bg-Azul cursor-pointer text-white shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? (
                                    <div className='flex items-center space-x-2'>
                                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                        <span>Salvando...</span>
                                    </div>
                                ) : (
                                    'Salvar Alterações'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
