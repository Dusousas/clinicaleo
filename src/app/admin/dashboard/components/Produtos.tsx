import React, { useState } from 'react';
import CuponsProdutos from './CuponsProdutos';
import RelatorioProdutos from './RelatorioProdutos';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  ativo: boolean;
  descricao: string;
}

export interface Cupom {
  id: number;
  codigo: string;
  desconto: number;
  tipo: 'percentual' | 'fixo';
  dataExpiracao: string;
  ativo: boolean;
  usoMaximo: number;
  usosAtuais: number;
}

export default function Produtos() {
    const [activeTab, setActiveTab] = useState<'produtos' | 'cupons' | 'relatorios'>('produtos');
    const [editingProduct, setEditingProduct] = useState<number | null>(null);

    // Mock data - produtos digitais/serviços
    const [produtos, setProdutos] = useState<Produto[]>([
        { id: 1, nome: 'Gel para Sobrancelha', preco: 45, categoria: 'Saúde', ativo: true, descricao: '' },
        { id: 2, nome: 'Gel para Sobrancelha', preco: 45, categoria: 'Saúde', ativo: true, descricao: '' },
        { id: 3, nome: 'Gel para Sobrancelha', preco: 45, categoria: 'Saúde', ativo: true, descricao: '' },
        { id: 4, nome: 'Gel para Sobrancelha', preco: 45, categoria: 'Saúde', ativo: true, descricao: '' },


    ]);

    const [cupons, setCupons] = useState<Cupom[]>([
        { id: 1, codigo: 'WELCOME50', desconto: 50, tipo: 'percentual', dataExpiracao: '2025-12-31', ativo: true, usoMaximo: 100, usosAtuais: 23 },
        { id: 2, codigo: 'DESCONTO100', desconto: 100, tipo: 'fixo', dataExpiracao: '2025-10-15', ativo: true, usoMaximo: 50, usosAtuais: 12 },
        { id: 3, codigo: 'BLACK30', desconto: 30, tipo: 'percentual', dataExpiracao: '2025-11-30', ativo: false, usoMaximo: 200, usosAtuais: 189 }
    ]);

    const updateProductPrice = (id: number, novoPreco: number) => {
        setProdutos(prev => prev.map(p => p.id === id ? { ...p, preco: novoPreco } : p));
        setEditingProduct(null);
    };

    const toggleProductStatus = (id: number) => {
        setProdutos(prev => prev.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <section className="">
            <div className="">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Gerenciamento de Produtos</h2>
                    <p className="text-gray-700">Gerencie preços, cupons de desconto e relatórios de vendas</p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                { key: 'produtos', label: 'Produtos & Preços', icon: '🛍️' },
                                { key: 'cupons', label: 'Cupons de Desconto', icon: '🎟️' },
                                { key: 'relatorios', label: 'Relatórios', icon: '📊' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.key
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Produtos Tab */}
                {activeTab === 'produtos' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Produtos Digitais</h2>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">Gerencie preços e status dos seus produtos</p>
                            </div>
                            
                            {/* Mobile Card View */}
                            <div className="block md:hidden">
                                <div className="divide-y divide-gray-200">
                                    {produtos.map((produto) => (
                                        <div key={produto.id} className="p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-gray-900 truncate">{produto.nome}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{produto.descricao}</p>
                                                    <span className="inline-flex mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {produto.categoria}
                                                    </span>
                                                </div>
                                                <label className="inline-flex items-center ml-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={produto.ativo}
                                                        onChange={() => toggleProductStatus(produto.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className={`ml-2 text-xs ${produto.ativo ? 'text-green-600' : 'text-red-600'}`}>
                                                        {produto.ativo ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                {editingProduct === produto.id ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="number"
                                                            defaultValue={produto.preco}
                                                            step="0.01"
                                                            min="0"
                                                            className="w-24 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const newPrice = parseFloat((e.target as HTMLInputElement).value);
                                                                    if (newPrice > 0) {
                                                                        updateProductPrice(produto.id, newPrice);
                                                                    }
                                                                } else if (e.key === 'Escape') {
                                                                    setEditingProduct(null);
                                                                }
                                                            }}
                                                            onBlur={(e) => {
                                                                const newPrice = parseFloat(e.target.value);
                                                                if (newPrice > 0) {
                                                                    updateProductPrice(produto.id, newPrice);
                                                                } else {
                                                                    setEditingProduct(null);
                                                                }
                                                            }}
                                                            autoFocus
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            {formatCurrency(produto.preco)}
                                                        </span>
                                                        <button
                                                            onClick={() => setEditingProduct(produto.id)}
                                                            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                                            title="Editar preço"
                                                        >
                                                            ✏️
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Atual</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {produtos.map((produto) => (
                                            <tr key={produto.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                                                        <div className="text-sm text-gray-500">{produto.descricao}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {produto.categoria}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingProduct === produto.id ? (
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="number"
                                                                defaultValue={produto.preco}
                                                                step="0.01"
                                                                min="0"
                                                                className="w-24 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const newPrice = parseFloat((e.target as HTMLInputElement).value);
                                                                        if (newPrice > 0) {
                                                                            updateProductPrice(produto.id, newPrice);
                                                                        }
                                                                    } else if (e.key === 'Escape') {
                                                                        setEditingProduct(null);
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    const newPrice = parseFloat(e.target.value);
                                                                    if (newPrice > 0) {
                                                                        updateProductPrice(produto.id, newPrice);
                                                                    } else {
                                                                        setEditingProduct(null);
                                                                    }
                                                                }}
                                                                autoFocus
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg font-semibold text-gray-900">
                                                                {formatCurrency(produto.preco)}
                                                            </span>
                                                            <button
                                                                onClick={() => setEditingProduct(produto.id)}
                                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                                title="Editar preço"
                                                            >
                                                                ✏️
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={produto.ativo}
                                                            onChange={() => toggleProductStatus(produto.id)}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                        <span className={`ml-2 text-sm ${produto.ativo ? 'text-green-600' : 'text-red-600'}`}>
                                                            {produto.ativo ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cupons Tab */}
                {activeTab === 'cupons' && (
                    <CuponsProdutos cupons={cupons} setCupons={setCupons} />
                )}

                {/* Relatórios Tab */}
                {activeTab === 'relatorios' && (
                    <RelatorioProdutos produtos={produtos} formatCurrency={formatCurrency} />
                )}
            </div>
        </section>
    );
}