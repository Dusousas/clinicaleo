import React, { useState } from 'react';
import { Cupom } from './Produtos';

interface CuponsProdutosProps {
    cupons: Cupom[];
    setCupons: React.Dispatch<React.SetStateAction<Cupom[]>>;
}

const CouponForm = ({ coupon, onSave, onCancel }: {
    coupon?: Partial<Cupom>;
    onSave: (cupom: Omit<Cupom, 'id' | 'usosAtuais'>) => void;
    onCancel: () => void;
}) => {
    const [formData, setFormData] = useState({
        codigo: coupon?.codigo || '',
        desconto: coupon?.desconto || 0,
        tipo: coupon?.tipo || 'percentual' as 'percentual' | 'fixo',
        dataExpiracao: coupon?.dataExpiracao || '',
        ativo: coupon?.ativo ?? true,
        usoMaximo: coupon?.usoMaximo || 100
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
                {coupon ? 'Editar Cupom' : 'Novo Cupom'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Código do Cupom</label>
                        <input
                            type="text"
                            value={formData.codigo}
                            onChange={(e) => setFormData(prev => ({ ...prev, codigo: e.target.value.toUpperCase() }))}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ex: DESCONTO20"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tipo de Desconto</label>
                        <select
                            value={formData.tipo}
                            onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'percentual' | 'fixo' }))}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="percentual">Percentual (%)</option>
                            <option value="fixo">Valor Fixo (R$)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Desconto ({formData.tipo === 'percentual' ? '%' : 'R$'})
                        </label>
                        <input
                            type="number"
                            value={formData.desconto}
                            onChange={(e) => setFormData(prev => ({ ...prev, desconto: parseFloat(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max={formData.tipo === 'percentual' ? 100 : undefined}
                            step={formData.tipo === 'percentual' ? 1 : 0.01}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Data de Expiração</label>
                        <input
                            type="date"
                            value={formData.dataExpiracao}
                            onChange={(e) => setFormData(prev => ({ ...prev, dataExpiracao: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Uso Máximo</label>
                        <input
                            type="number"
                            value={formData.usoMaximo}
                            onChange={(e) => setFormData(prev => ({ ...prev, usoMaximo: parseInt(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="ativo"
                            checked={formData.ativo}
                            onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="ativo" className="ml-2 text-sm font-medium">Cupom Ativo</label>
                    </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {coupon ? 'Atualizar' : 'Criar'} Cupom
                    </button>
                </div>
            </form>
        </div>
    );
};

export default function CuponsProdutos({ cupons, setCupons }: CuponsProdutosProps) {
    const [showNewCoupon, setShowNewCoupon] = useState(false);

    const toggleCouponStatus = (id: number) => {
        setCupons(prev => prev.map(c => c.id === id ? { ...c, ativo: !c.ativo } : c));
    };

    const addNewCoupon = (novoCupom: Omit<Cupom, 'id' | 'usosAtuais'>) => {
        const newId = Math.max(...cupons.map(c => c.id)) + 1;
        setCupons(prev => [...prev, { ...novoCupom, id: newId, usosAtuais: 0 }]);
        setShowNewCoupon(false);
    };

    const deleteCoupon = (id: number) => {
        setCupons(prev => prev.filter(c => c.id !== id));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Cupons de Desconto</h2>
                    <p className="text-gray-600 text-sm mt-1">Crie e gerencie cupons promocionais</p>
                </div>
                <button
                    onClick={() => setShowNewCoupon(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    + Novo Cupom
                </button>
            </div>

            {showNewCoupon && (
                <CouponForm
                    onSave={addNewCoupon}
                    onCancel={() => setShowNewCoupon(false)}
                />
            )}

            <div className="grid gap-4">
                {cupons.map((cupom) => (
                    <div key={cupom.id} className="bg-white p-6 rounded-lg border shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-xl font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                                        {cupom.codigo}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        cupom.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {cupom.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Desconto:</span>
                                        <div className="font-semibold text-green-600">
                                            {cupom.tipo === 'percentual' ? `${cupom.desconto}%` : formatCurrency(cupom.desconto)}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Expira em:</span>
                                        <div className="font-semibold">{new Date(cupom.dataExpiracao).toLocaleDateString('pt-BR')}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Usos:</span>
                                        <div className="font-semibold">{cupom.usosAtuais} / {cupom.usoMaximo}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Taxa de uso:</span>
                                        <div className="font-semibold">{Math.round((cupom.usosAtuais / cupom.usoMaximo) * 100)}%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={cupom.ativo}
                                        onChange={() => toggleCouponStatus(cupom.id)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm">Ativo</span>
                                </label>
                                <button
                                    onClick={() => deleteCoupon(cupom.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors p-1"
                                    title="Excluir cupom"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}