import React from 'react';
import { Produto } from './Produtos';

interface RelatorioProdutosProps {
    produtos: Produto[];
    formatCurrency: (value: number) => string;
}

export default function RelatorioProdutos({ produtos, formatCurrency }: RelatorioProdutosProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Relatórios de Vendas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                💰
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Revenue Total</div>
                            <div className="text-2xl font-bold text-gray-900">R$ 47.582</div>
                            <div className="text-sm text-green-600">+12% este mês</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                🛒
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Vendas</div>
                            <div className="text-2xl font-bold text-gray-900">286</div>
                            <div className="text-sm text-blue-600">+8% este mês</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                                🎟️
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Cupons Usados</div>
                            <div className="text-2xl font-bold text-gray-900">224</div>
                            <div className="text-sm text-purple-600">35% das vendas</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
                <div className="space-y-3">
                    {produtos.filter(p => p.ativo).slice(0, 3).map((produto, index) => (
                        <div key={produto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                                <div>
                                    <div className="font-medium">{produto.nome}</div>
                                    <div className="text-sm text-gray-500">{produto.categoria}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">{Math.floor(Math.random() * 50) + 10} vendas</div>
                                <div className="text-sm text-gray-500">{formatCurrency(produto.preco)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}