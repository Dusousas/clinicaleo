"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Stethoscope, Clock, Phone, Video, Paperclip } from 'lucide-react';

export default function ChatMedico() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Olá! Sou Dr. Leo. Estou aqui para responder suas dúvidas. Pode me fazer suas perguntas que responderei assim que possível.",
            sender: 'medico',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'entregue'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [medicoOnline, setMedicoOnline] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const userMessage = {
                id: Date.now(),
                text: inputValue,
                sender: 'paciente',
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                status: 'enviado'
            };

            setMessages(prev => [...prev, userMessage]);
            setInputValue('');

            setTimeout(() => {
                setMessages(prev => prev.map(msg => 
                    msg.id === userMessage.id ? { ...msg, status: 'entregue' } : msg
                ));
            }, 1000);
        }
    };

    const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const adicionarRespostaMedico = (resposta: any) => {
        const medicoMessage = {
            id: Date.now(),
            text: resposta,
            sender: 'medico',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'entregue'
        };
        
        setMessages(prev => [...prev, medicoMessage]);
    };

    return (
        <section className=''>
            <div className='max-w-4xl mx-auto px-4'>
                <div className='bg-white rounded-t-2xl shadow-lg p-6 border-b border-blue-100'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
                            <Stethoscope className='w-6 h-6 text-white' />
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-xl font-bold text-gray-700'>Dr. Leo</h3>
                            <p className='text-sm text-gray-700'>CRM 12345-SP • Clínico Geral</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white shadow-lg h-[500px] overflow-y-auto p-6 space-y-4'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.sender === 'paciente' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                                message.sender === 'paciente' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700'
                            }`}>
                                <p className='text-sm leading-relaxed whitespace-pre-wrap'>{message.text}</p>
                                <div className={`flex items-center justify-between mt-2 text-xs ${
                                    message.sender === 'paciente' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    <div className='flex items-center gap-1'>
                                        <Clock className='w-3 h-3' />
                                        <span>{message.time}</span>
                                    </div>
                                    {message.sender === 'paciente' && (
                                        <span className={`${
                                            message.status === 'enviado' ? 'text-blue-200' : 'text-blue-100'
                                        }`}>
                                            {message.status === 'enviado' ? '✓' : '✓✓'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div ref={messagesEndRef} />
                </div>

                <div className='bg-white rounded-b-2xl shadow-lg p-6'>
                    {!medicoOnline && (
                        <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
                            <p className='text-sm text-yellow-800'>
                                <strong>Dr. Leo está offline</strong> - Sua mensagem será entregue quando ele estiver disponível.
                            </p>
                        </div>
                    )}
                    
                    <div className='flex gap-3 items-end'>
                        <button className='p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors'>
                            <Paperclip className='w-5 h-5' />
                        </button>
                        
                        <div className='flex-1'>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite sua dúvida ou sintoma..."
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
                    
                    <p className='text-xs text-gray-700 mt-2'>Pressione Enter para enviar • Shift + Enter para nova linha</p>
                </div>


            </div>
        </section>
    );
}