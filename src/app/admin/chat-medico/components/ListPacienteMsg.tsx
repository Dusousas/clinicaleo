"use client";

import React from 'react';
import { User, Clock, Circle } from 'lucide-react';

interface Paciente {
    id: number;
    nome: string;
    ultimaMensagem: string;
    horario: string;
    naoLidas: number;
    online: boolean;
    avatar?: string;
}

interface ListPacienteMsgProps {
    pacientes: Paciente[];
    pacienteSelecionado: number | null;
    onSelecionarPaciente: (id: number) => void;
}

export default function ListPacienteMsg({ 
    pacientes, 
    pacienteSelecionado, 
    onSelecionarPaciente 
}: ListPacienteMsgProps) {
    return (
        <div className='bg-white rounded-2xl shadow-lg h-[600px] flex flex-col'>
            {/* Header da Lista */}
            <div className='p-4 border-b border-gray-200'>
                <h2 className='text-xl font-bold text-gray-800'>Pacientes</h2>
                <p className='text-sm text-gray-600 mt-1'>
                    {pacientes.filter(p => p.naoLidas > 0).length} com mensagens não lidas
                </p>
            </div>

            {/* Lista de Pacientes */}
            <div className='flex-1 overflow-y-auto'>
                {pacientes.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                        <User className='w-12 h-12 mb-4 opacity-50' />
                        <p className='text-lg font-medium'>Nenhuma conversa</p>
                        <p className='text-sm'>As mensagens dos pacientes aparecerão aqui</p>
                    </div>
                ) : (
                    <div className='divide-y divide-gray-100'>
                        {pacientes.map((paciente) => (
                            <div
                                key={paciente.id}
                                onClick={() => onSelecionarPaciente(paciente.id)}
                                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                    pacienteSelecionado === paciente.id 
                                        ? 'bg-blue-50 border-r-4 border-blue-500' 
                                        : ''
                                }`}
                            >
                                <div className='flex items-start gap-3'>
                                    {/* Avatar */}
                                    <div className='relative'>
                                        <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold'>
                                            {paciente.avatar ? (
                                                <img 
                                                    src={paciente.avatar} 
                                                    alt={paciente.nome}
                                                    className='w-full h-full rounded-full object-cover'
                                                />
                                            ) : (
                                                <span className='text-lg'>
                                                    {paciente.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Indicador Online */}
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                            paciente.online ? 'bg-green-400' : 'bg-gray-400'
                                        }`} />
                                    </div>

                                    {/* Informações do Paciente */}
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center justify-between mb-1'>
                                            <h3 className={`font-semibold text-gray-800 truncate ${
                                                paciente.naoLidas > 0 ? 'font-bold' : ''
                                            }`}>
                                                {paciente.nome}
                                            </h3>
                                            <div className='flex items-center gap-2'>
                                                <div className='flex items-center text-xs text-gray-500'>
                                                    <Clock className='w-3 h-3 mr-1' />
                                                    {paciente.horario}
                                                </div>
                                                {paciente.naoLidas > 0 && (
                                                    <div className='bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center'>
                                                        {paciente.naoLidas > 99 ? '99+' : paciente.naoLidas}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <p className={`text-sm text-gray-600 truncate ${
                                            paciente.naoLidas > 0 ? 'font-medium text-gray-800' : ''
                                        }`}>
                                            {paciente.ultimaMensagem}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer com estatísticas */}
            <div className='p-4 border-t border-gray-200 bg-gray-50'>
                <div className='flex items-center justify-between text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                        <Circle className='w-3 h-3 fill-green-400 text-green-400' />
                        <span>{pacientes.filter(p => p.online).length} online</span>
                    </div>
                    <div>
                        Total: {pacientes.length} pacientes
                    </div>
                </div>
            </div>
        </div>
    );
}