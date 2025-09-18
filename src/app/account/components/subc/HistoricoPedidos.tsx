import React from 'react';
import { X, Package, Calendar, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Pedido {
  id: string;
  data: string;
  total: number;
  status: 'entregue' | 'pendente' | 'cancelado';
  items: {
    nome: string;
    quantidade: number;
    preco: number;
  }[];
  metodoPagamento: string;
}

interface HistoricoPedidosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoricoPedidosModal: React.FC<HistoricoPedidosModalProps> = ({ isOpen, onClose }) => {
  // Dados de exemplo - você pode substituir por dados reais vindos de uma API
  const pedidos: Pedido[] = [
    {
      id: "PED001",
      data: "2025-09-15",
      total: 299.90,
      status: "entregue",
      items: [
        { nome: "Suplemento Vitamina D", quantidade: 2, preco: 89.90 },
        { nome: "Ômega 3 Premium", quantidade: 1, preco: 120.10 }
      ],
      metodoPagamento: "Cartão de Crédito"
    },
    {
      id: "PED002",
      data: "2025-09-10",
      total: 156.50,
      status: "pendente",
      items: [
        { nome: "Multivitamínico", quantidade: 1, preco: 156.50 }
      ],
      metodoPagamento: "PIX"
    },
    {
      id: "PED003",
      data: "2025-08-28",
      total: 89.90,
      status: "cancelado",
      items: [
        { nome: "Probiótico", quantidade: 1, preco: 89.90 }
      ],
      metodoPagamento: "Cartão de Débito"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'entregue':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pendente':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelado':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'text-green-600 bg-green-100';
      case 'pendente':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelado':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Histórico de Pedidos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {pedidos.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="border border-gray-200 rounded-lg p-4">
                  {/* Cabeçalho do pedido */}
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-800">Pedido #{pedido.id}</h3>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                        {getStatusIcon(pedido.status)}
                        {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-teal-600">
                      {formatCurrency(pedido.total)}
                    </div>
                  </div>

                  {/* Informações do pedido */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Data: {formatDate(pedido.data)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      <span>Pagamento: {pedido.metodoPagamento}</span>
                    </div>
                  </div>

                  {/* Items do pedido */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Itens do pedido:</h4>
                    <div className="space-y-2">
                      {pedido.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex-1">
                            <span className="text-gray-700">{item.nome}</span>
                            <span className="text-gray-500 ml-2">x{item.quantidade}</span>
                          </div>
                          <span className="text-gray-700 font-medium">
                            {formatCurrency(item.preco)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 py-2 px-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricoPedidosModal;