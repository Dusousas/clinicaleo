'use client';
import React, { useState } from 'react';

type ProductId = 'gel' | 'serum';

type Color = {
    id: string;
    name: string;
    hex: string;
    description: string;
};

type ColorsMap = {
    [key in ProductId]: Color[];
};

export default function SeletorProdutos() {
    const [selectedProduct, setSelectedProduct] = useState<ProductId | ''>('');
    const [selectedColor, setSelectedColor] = useState('');

    const products = [
        {
            id: 'gel',
            name: 'Gel para Sobrancelha',
            description: 'Gel fixador com pigmentação para definir e modelar suas sobrancelhas',
            price: 'R$ 45,90',
            image: '💄'
        },
        {
            id: 'serum',
            name: 'Sérum para Sobrancelha',
            description: 'Serum fortalecedor para estimular o crescimento e fortalecer os fios',
            price: 'R$ 65,90',
            image: '🧴'
        }
    ];

    const colors: ColorsMap = {
        gel: [
            { id: 'loiro-claro', name: 'Loiro Claro', hex: '#D4B896', description: 'Para sobrancelhas loiras' },
            { id: 'castanho-claro', name: 'Castanho Claro', hex: '#A0703C', description: 'Para sobrancelhas castanho claro' },
            { id: 'castanho-medio', name: 'Castanho Médio', hex: '#8B5A2B', description: 'Para sobrancelhas castanho médio' },
            { id: 'castanho-escuro', name: 'Castanho Escuro', hex: '#654321', description: 'Para sobrancelhas castanho escuro' },
            { id: 'preto', name: 'Preto', hex: '#2C1810', description: 'Para sobrancelhas pretas' }
        ],
        serum: [
            { id: 'transparente', name: 'Transparente', hex: '#F0F0F0', description: 'Serum incolor para todos os tipos' }
        ]
    };

    const availableColors = selectedProduct && selectedProduct in colors
        ? colors[selectedProduct as ProductId]
        : [];

    const handleContinue = () => {
        if (selectedProduct && selectedColor) {
            console.log('Produto selecionado:', selectedProduct);
            console.log('Cor selecionada:', selectedColor);
            window.location.href = '/checkout';
        }
    };

    return (
        <section className=''>
            <div className='maxW mx-auto px-4'>

                <h2 className='font-bold text-4xl mb-2 text-center'>
                    Escolha seu produto para sobrancelha
                </h2>
                <p className='text-gray-600 text-center mb-8 text-lg'>
                    Selecione o tipo de produto e a cor ideal para suas sobrancelhas
                </p>

                <div className='mb-12'>
                    <h3 className='font-semibold text-2xl mb-6'>
                        Tipo de Produto
                    </h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${selectedProduct === product.id
                                        ? 'border-Azul bg-white shadow-xl ring-2 ring-Azul ring-opacity-20'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                    }`}
                                onClick={() => {
                                    setSelectedProduct(product.id as ProductId);
                                    setSelectedColor('');
                                }}
                            >
                                {selectedProduct === product.id && (
                                    <div className='absolute -top-3 left-6 bg-Verde text-white px-3 py-1 rounded-full text-sm font-medium'>
                                        Selecionado
                                    </div>
                                )}

                                <div className='text-center'>
                                    <h4 className='font-bold text-xl mb-2'>
                                        {product.name}
                                    </h4>
                                    <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                                        {product.description}
                                    </p>
                                    <div className='text-2xl font-bold text-Azul'>
                                        {product.price}
                                    </div>
                                </div>

                                <div className='flex justify-center mt-4'>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedProduct === product.id
                                            ? 'border-Azul bg-Azul'
                                            : 'border-gray-300'
                                        }`}>
                                        {selectedProduct === product.id && (
                                            <div className='w-3 h-3 bg-white rounded-full'></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProduct && (
                    <div className='mb-12 animate-fadeIn'>
                        <h3 className='font-semibold text-2xl mb-6'>
                            Escolha a Cor
                        </h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                            {availableColors.map((color) => (
                                <div
                                    key={color.id}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedColor === color.id
                                            ? 'border-Azul bg-white shadow-lg ring-2 ring-Azul ring-opacity-20'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                        }`}
                                    onClick={() => setSelectedColor(color.id)}
                                >
                                    <div className='text-center'>
                                        <div
                                            className='w-12 h-12 rounded-full mx-auto mb-3 border-2 border-gray-200'
                                            style={{ backgroundColor: color.hex }}
                                        ></div>
                                        <h5 className='font-semibold text-sm mb-1'>
                                            {color.name}
                                        </h5>
                                        <p className='text-gray-600 text-xs leading-tight'>
                                            {color.description}
                                        </p>
                                    </div>

                                    <div className='flex justify-center mt-3'>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedColor === color.id
                                                ? 'border-Azul bg-Azul'
                                                : 'border-gray-300'
                                            }`}>
                                            {selectedColor === color.id && (
                                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedProduct && selectedColor && (
                    <div className='bg-white rounded-xl p-6 shadow-lg mb-8'>
                        <h3 className='font-semibold text-xl mb-4'>
                            Resumo da sua escolha:
                        </h3>
                        <div className='flex flex-col sm:flex-row justify-between items-center'>
                            <div>
                                <p className='text-gray-800 font-medium'>
                                    Produto: {products.find(p => p.id === selectedProduct)?.name}
                                </p>
                                <p className='text-gray-800 font-medium'>
                                    Cor: {availableColors.find(c => c.id === selectedColor)?.name}
                                </p>
                                <p className='text-2xl font-bold mt-2'>
                                    {products.find(p => p.id === selectedProduct)?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                )}


                <div className='flex justify-center'>
                    <button
                        className={`px-12 py-4 rounded-xl uppercase tracking-wider font-semibold text-lg transition-all transform hover:scale-105 ${selectedProduct && selectedColor
                                ? 'bg-Azul text-white cursor-pointer shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!selectedProduct || !selectedColor}
                        onClick={handleContinue}
                    >
                        {selectedProduct && selectedColor ? 'Continuar' : 'Selecione produto e cor'}
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
        </section>
    );
}