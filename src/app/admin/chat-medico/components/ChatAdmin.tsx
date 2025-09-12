"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Stethoscope, Clock, Paperclip, Phone, Video } from 'lucide-react';
import ListPacienteMsg from './ListPacienteMsg';

interface Message {
    id: number;
    text: string;
    sender: 'medico' | 'paciente';
    time: string;
    status: 'enviado' | 'entregue' | 'lido';
}

interface Paciente {
    id: number;
    nome: string;
    ultimaMensagem: string;
    horario: string;
    naoLidas: number;
    online: boolean;
    avatar?: string;
    crm?: string;
    especialidade?: string;
}

export default function ChatAdmin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [pacienteSelecionado, setPacienteSelecionado] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Dados mock dos pacientes
    const [pacientes] = useState<Paciente[]>([
        {
            id: 1,
            nome: 'Maria Silva',
            ultimaMensagem: 'Doutor, estou sentindo dores no peito...',
            horario: '14:30',
            naoLidas: 3,
            online: true
        },
        {
            id: 2,
            nome: 'João Santos',
            ultimaMensagem: 'Obrigado pela consulta!',
            horario: '13:45',
            naoLidas: 0,
            online: false
        },
        {
            id: 3,
            nome: 'Ana Costa',
            ultimaMensagem: 'Quando posso agendar o retorno?',
            horario: '12:20',
            naoLidas: 1,
            online: true
        },
        {
            id: 4,
            nome: 'Pedro Oliveira',
            ultimaMensagem: 'A medicação está fazendo efeito',
            horario: '11:30',
            naoLidas: 0,
            online: true
        },
        {
            id: 5,
            nome: 'Lucia Fernandes',
            ultimaMensagem: 'Preciso falar sobre os exames',
            horario: '10:15',
            naoLidas: 2,
            online: false
        }
    ]);

    // Mock de conversas por paciente
    const conversasPorPaciente: { [key: number]: Message[] } = {
        1: [
            {
                id: 1,
                text: "Olá Maria! Como posso ajudá-la hoje?",
                sender: 'medico',
                time: '14:25',
                status: 'lido'
            },
            {
                id: 2,
                text: "Doutor, estou sentindo dores no peito desde ontem...",
                sender: 'paciente',
                time: '14:26',
                status: 'entregue'
            },
            {
                id: 3,
                text: "A dor é constante ou vem em episódios?",
                sender: 'medico',
                time: '14:27',
                status: 'lido'
            },
            {
                id: 4,
                text: "Vem em episódios, principalmente quando me movimento",
                sender: 'paciente',
                time: '14:30',
                status: 'entregue'
            }
        ],
        2: [
            {
                id: 1,
                text: "Boa tarde, João! Como está se sentindo após o tratamento?",
                sender: 'medico',
                time: '13:40',
                status: 'lido'
            },
            {
                id: 2,
                text: "Muito melhor, doutor! Obrigado pela consulta!",
                sender: 'paciente',
                time: '13:45',
                status: 'entregue'
            }
        ],
        3: [
            {
                id: 1,
                text: "Olá Ana! Vi que você quer agendar um retorno.",
                sender: 'medico',
                time: '12:15',
                status: 'lido'
            },
            {
                id: 2,
                text: "Sim, doutor. Quando posso agendar o retorno?",
                sender: 'paciente',
                time: '12:20',
                status: 'entregue'
            }
        ]
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSelecionarPaciente = (pacienteId: number) => {
        setPacienteSelecionado(pacienteId);
        // Carrega as mensagens do paciente selecionado
        const mensagensPaciente = conversasPorPaciente[pacienteId] || [];
        setMessages(mensagensPaciente);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() && pacienteSelecionado) {
            const newMessage: Message = {
                id: Date.now(),
                text: inputValue,
                sender: 'medico',
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                status: 'enviado'
            };

            setMessages(prev => [...prev, newMessage]);
            setInputValue('');

            // Simula entrega da mensagem
            setTimeout(() => {
                setMessages(prev => prev.map(msg => 
                    msg.id === newMessage.id ? { ...msg, status: 'entregue' } : msg
                ));
            }, 1000);

            // Simula leitura da mensagem
            setTimeout(() => {
                setMessages(prev => prev.map(msg => 
                    msg.id === newMessage.id ? { ...msg, status: 'lido' } : msg
                ));
            }, 2000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const pacienteAtual = pacientes.find(p => p.id === pacienteSelecionado);

    return (
        <section className='min-h-screen bg-Bg1'>
            <div className=' mx-auto px-4'>
                <div className='mb-6'>
                    <h2 className='text-3xl font-bold'>Painel Administrativo</h2>
                    <p className='text-gray-700 mt-2'>Gerencie as conversas com seus pacientes</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Lista de Pacientes */}
                    <div className='lg:col-span-1'>
                        <ListPacienteMsg 
                            pacientes={pacientes}
                            pacienteSelecionado={pacienteSelecionado}
                            onSelecionarPaciente={handleSelecionarPaciente}
                        />
                    </div>

                    {/* Área do Chat */}
                    <div className='lg:col-span-2'>
                        {pacienteSelecionado && pacienteAtual ? (
                            <div className='bg-white rounded-2xl shadow-lg h-[600px] flex flex-col'>
                                {/* Header do Chat */}
                                <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold'>
                                            <span className='text-lg'>
                                                {pacienteAtual.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-bold text-gray-800'>{pacienteAtual.nome}</h3>
                                            <p className='text-sm text-gray-600'>
                                                {pacienteAtual.online ? (
                                                    <span className='flex items-center gap-1'>
                                                        <div className='w-2 h-2 bg-green-400 rounded-full' />
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className='text-gray-500'>Offline</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className='flex gap-2'>
                                        <button className='p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors'>
                                            <Phone className='w-5 h-5' />
                                        </button>
                                        <button className='p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors'>
                                            <Video className='w-5 h-5' />
                                        </button>
                                    </div>
                                </div>

                                {/* Área de Mensagens */}
                                <div className='flex-1 overflow-y-auto p-6 space-y-4'>
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex gap-3 ${message.sender === 'medico' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                message.sender === 'medico' 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-500 text-white'
                                            }`}>
                                                {message.sender === 'medico' ? 
                                                    <Stethoscope className='w-4 h-4' /> : 
                                                    <User className='w-4 h-4' />
                                                }
                                            </div>
                                            
                                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                                message.sender === 'medico' 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                <p className='text-sm leading-relaxed whitespace-pre-wrap'>{message.text}</p>
                                                <div className={`flex items-center justify-between mt-2 text-xs ${
                                                    message.sender === 'medico' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                    <div className='flex items-center gap-1'>
                                                        <Clock className='w-3 h-3' />
                                                        <span>{message.time}</span>
                                                    </div>
                                                    {message.sender === 'medico' && (
                                                        <span className={`${
                                                            message.status === 'enviado' ? 'text-blue-200' : 
                                                            message.status === 'entregue' ? 'text-blue-100' : 'text-green-300'
                                                        }`}>
                                                            {message.status === 'enviado' ? '✓' : 
                                                             message.status === 'entregue' ? '✓✓' : '✓✓'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Área de Input */}
                                <div className='p-6 border-t border-gray-200'>
                                    <div className='flex gap-3 items-end'>
                                        <button className='p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors'>
                                            <Paperclip className='w-5 h-5' />
                                        </button>
                                        
                                        <div className='flex-1'>
                                            <textarea
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder={`Responder para ${pacienteAtual.nome}...`}
                                                className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32'
                                                rows={1}
                                                style={{ height: 'auto' }}
                                                onInput={(e) => {
                                                    const textarea = e.target as HTMLTextAreaElement;
                                                    textarea.style.height = 'auto';
                                                    textarea.style.height = textarea.scrollHeight + 'px';
                                                }}
                                            />
                                        </div>
                                        
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!inputValue.trim()}
                                            className={`p-3 rounded-xl transition-all ${
                                                inputValue.trim() 
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            <Send className='w-5 h-5' />
                                        </button>
                                    </div>
                                    
                                    <p className='text-xs text-gray-500 mt-2'>
                                        Pressione Enter para enviar • Shift + Enter para nova linha
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // Estado quando nenhum paciente está selecionado
                            <div className='bg-white rounded-2xl shadow-lg h-[600px] flex items-center justify-center'>
                                <div className='text-center text-gray-500'>
                                    <Stethoscope className='w-16 h-16 mx-auto mb-4 opacity-50' />
                                    <h3 className='text-xl font-medium mb-2'>Selecione um paciente</h3>
                                    <p className='text-gray-400'>Escolha um paciente na lista para iniciar a conversa</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}