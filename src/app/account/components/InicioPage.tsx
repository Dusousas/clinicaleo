import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCcw,
  Package,
  User
} from 'lucide-react';

// Tipos TypeScript
interface ProdutoAprovacao {
  id: string;
  numeroPedido: string;
  nomeProduto: string;
  imagemProduto: string;
  preco: number;
  status: 'aprovado' | 'recusado' | 'analisando';
  medicoResponsavel: string;
  dataAnalise?: string;
  motivoRecusa?: string;
}

const AprovacaoMedicaPage = () => {
  // Dados mockados das aprovações
  const produtos: ProdutoAprovacao[] = [
    {
      id: '1',
      numeroPedido: '#12345',
      nomeProduto: 'Sérum Crescimento Sobrancelhas Premium',
      imagemProduto: '/api/placeholder/80/80',
      preco: 89.90,
      status: 'aprovado',
      medicoResponsavel: 'Dr. Maria Silva',
      dataAnalise: '2024-01-15'
    },
    {
      id: '2',
      numeroPedido: '#12344',
      nomeProduto: 'Kit Completo Crescimento Sobrancelhas',
      imagemProduto: '/api/placeholder/80/80',
      preco: 129.90,
      status: 'recusado',
      medicoResponsavel: 'Dr. João Santos',
      dataAnalise: '2024-01-14',
      motivoRecusa: 'Produto não indicado para o seu perfil devido a sensibilidade reportada no questionário.'
    },
    {
      id: '3',
      numeroPedido: '#12343',
      nomeProduto: 'Óleo Nutritivo para Sobrancelhas',
      imagemProduto: '/api/placeholder/80/80',
      preco: 45.90,
      status: 'analisando',
      medicoResponsavel: 'Em análise'
    }
  ];

  // Função para obter configuração do status
  const getStatusConfig = (status: ProdutoAprovacao['status']) => {
    const configs = {
      aprovado: {
        label: 'Aprovado',
        color: 'text-green-700 bg-green-100 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-600'
      },
      recusado: {
        label: 'Recusado',
        color: 'text-red-700 bg-red-100 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-600'
      },
      analisando: {
        label: 'Em Análise',
        color: 'text-orange-700 bg-orange-100 border-orange-200',
        icon: Clock,
        iconColor: 'text-orange-600'
      }
    };
    return configs[status];
  };

  const handleSolicitarReembolso = (produtoId: string) => {
    // Aqui você implementaria a lógica de reembolso
    console.log(`Solicitando reembolso para produto ${produtoId}`);
    alert('Solicitação de reembolso enviada! Você receberá um e-mail com as instruções.');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="">

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Aprovação Médica</h2>
          <p className="text-gray-700">Acompanhe o status da análise médica dos seus produtos</p>
        </div>

        {produtos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum produto em análise</h3>
            <p className="text-gray-700">Você ainda não possui produtos aguardando aprovação médica.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {produtos.map((produto) => {
              const statusConfig = getStatusConfig(produto.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={produto.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-10 h-10 text-gray-400" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <h2 className="font-bold  text-lg mb-1">{produto.nomeProduto}</h2>
                            <p className="text-sm text-gray-700 mb-2">Pedido {produto.numeroPedido} • R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            
                            {/* Médico Responsável */}
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <User className="w-4 h-4" />
                              <span>{produto.medicoResponsavel}</span>
                              {produto.dataAnalise && (
                                <span className="text-gray-400">
                                  • {new Date(produto.dataAnalise).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                            <StatusIcon className={`w-4 h-4 mr-2 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo Específico por Status */}
                  {produto.status === 'aprovado' && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-green-800 mb-1">
                              Produto Aprovado!
                            </h4>
                            <p className="text-green-700 text-sm">
                              Seu produto foi aprovado pelo médico e será enviado em breve. 
                              Você receberá um e-mail com o código de rastreamento.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {produto.status === 'recusado' && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-medium text-red-800 mb-2">
                              Produto Recusado
                            </h4>
                            {produto.motivoRecusa && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-red-700 mb-1">
                                  Motivo da recusa:
                                </p>
                                <p className="text-red-600 text-sm">
                                  {produto.motivoRecusa}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botão de Reembolso */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleSolicitarReembolso(produto.id)}
                          className="flex items-center cursor-pointer justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          <RefreshCcw className="w-4 h-4" />
                          Solicitar Reembolso
                        </button>
                        <button className="flex items-center cursor-pointer justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                          Falar com Suporte
                        </button>
                      </div>
                    </div>
                  )}

                  {produto.status === 'analisando' && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-orange-800 mb-1">
                              Análise em Andamento
                            </h4>
                            <p className="text-orange-700 text-sm">
                              Nossos médicos estão analisando seu perfil e histórico médico. 
                              O resultado será enviado por e-mail em até 24 horas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AprovacaoMedicaPage;