import React, { useState } from 'react';

interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
  status: 'pago' | 'pendente' | 'cancelado';
  paciente?: string;
  metodoPagamento?: string;
}

interface ResumoFinanceiro {
  receitaTotal: number;
  transacoesPendentes: number;
  consultasRealizadas: number;
}

// Dados de exemplo
const resumoExemplo: ResumoFinanceiro = {
  receitaTotal: 45750.00,
  transacoesPendentes: 8,
  consultasRealizadas: 127
};

const transacoesExemplo: Transacao[] = [
  {
    id: '1',
    tipo: 'receita',
    categoria: 'Consulta',
    descricao: 'Consulta - Maria Silva',
    valor: 350.00,
    data: '2024-03-15T14:30:00',
    status: 'pago',
    paciente: 'Maria Silva',
    metodoPagamento: 'Cartão de Crédito'
  },
  {
    id: '2',
    tipo: 'receita',
    categoria: 'Medicamento',
    descricao: 'Finasterida 1mg - João Santos',
    valor: 89.90,
    data: '2024-03-15T10:15:00',
    status: 'pago',
    paciente: 'João Santos',
    metodoPagamento: 'PIX'
  },
  {
    id: '3',
    tipo: 'receita',
    categoria: 'Consulta',
    descricao: 'Consulta - Ana Costa',
    valor: 350.00,
    data: '2024-03-14T11:20:00',
    status: 'pendente',
    paciente: 'Ana Costa',
    metodoPagamento: 'Boleto'
  },
  {
    id: '4',
    tipo: 'receita',
    categoria: 'Medicamento',
    descricao: 'Minoxidil 5% - Pedro Oliveira',
    valor: 65.00,
    data: '2024-03-13T15:30:00',
    status: 'pago',
    paciente: 'Pedro Oliveira',
    metodoPagamento: 'PIX'
  }
];

export default function Financeiro() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesExemplo);
  const [resumo] = useState<ResumoFinanceiro>(resumoExemplo);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('mes');

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const transacoesFiltradas = transacoes.filter(transacao => {
    const filtroTipoOk = filtroTipo === 'todos' || transacao.tipo === filtroTipo;
    const filtroStatusOk = filtroStatus === 'todos' || transacao.status === filtroStatus;
    return filtroTipoOk && filtroStatusOk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago': return 'Pago';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const getTipoIcon = (tipo: string) => {
    if (tipo === 'receita') {
      return (
        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center'>
          <svg className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
        </div>
      );
    } else {
      return (
        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center'>
          <svg className='w-4 h-4 sm:w-5 sm:h-5 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 12H6' />
          </svg>
        </div>
      );
    }
  };

  return (
    <>
      <section className='py-4 sm:py-6'>
        <div className='maxW px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>Financeiro</h1>
              <p className='text-gray-600 mt-1 text-sm sm:text-base'>Controle suas receitas</p>
            </div>
            
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
              <select 
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className='px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              >
                <option value="semana">Esta semana</option>
                <option value="mes">Este mês</option>
                <option value="trimestre">Este trimestre</option>
                <option value="ano">Este ano</option>
              </select>
              
              <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                Exportar Relatório
              </button>
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
            <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                  </svg>
                </div>
                <div className='ml-3 sm:ml-4'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500'>Receita Total</p>
                  <p className='text-lg sm:text-2xl font-bold text-gray-900'>{formatarMoeda(resumo.receitaTotal)}</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div className='ml-3 sm:ml-4'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500'>Pendentes</p>
                  <p className='text-lg sm:text-2xl font-bold text-gray-900'>{resumo.transacoesPendentes}</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                  </svg>
                </div>
                <div className='ml-3 sm:ml-4'>
                  <p className='text-xs sm:text-sm font-medium text-gray-500'>Consultas</p>
                  <p className='text-lg sm:text-2xl font-bold text-gray-900'>{resumo.consultasRealizadas}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6'>
            <select 
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className='px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            >
              <option value="todos">Todos os tipos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
            
            <select 
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className='px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            >
              <option value="todos">Todos os status</option>
              <option value="pago">Pagos</option>
              <option value="pendente">Pendentes</option>
              <option value="cancelado">Cancelados</option>
            </select>
            
            <div className='bg-gray-50 px-3 py-2 rounded-lg flex-shrink-0'>
              <span className='text-sm font-medium text-gray-700'>
                {transacoesFiltradas.length} transaç{transacoesFiltradas.length !== 1 ? 'ões' : 'ão'}
              </span>
            </div>
          </div>

          {/* Lista de Transações */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
            {transacoesFiltradas.length === 0 ? (
              <div className='p-4 sm:p-8 text-center'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-6 h-6 sm:w-8 sm:h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                  </svg>
                </div>
                <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-2'>Nenhuma transação encontrada</h3>
                <p className='text-sm sm:text-base text-gray-500'>Não há transações com os filtros selecionados.</p>
              </div>
            ) : (
              <div className='divide-y divide-gray-200'>
                {transacoesFiltradas.map((transacao) => (
                  <div key={transacao.id} className='p-4 sm:p-6 hover:bg-gray-50 transition-colors'>
                    <div className='flex items-center gap-3 sm:gap-4'>
                      {getTipoIcon(transacao.tipo)}
                      
                      <div className='flex-1 min-w-0'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                          <div className='min-w-0'>
                            <h3 className='font-semibold text-gray-900 text-sm sm:text-base truncate'>{transacao.descricao}</h3>
                            <p className='text-xs sm:text-sm text-gray-500'>{transacao.categoria}</p>
                            {transacao.paciente && (
                              <p className='text-xs sm:text-sm text-blue-600 font-medium'>{transacao.paciente}</p>
                            )}
                          </div>
                          
                          <div className='flex flex-col sm:items-end gap-1'>
                            <span className={`text-base sm:text-lg font-bold ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                              {transacao.tipo === 'receita' ? '+' : '-'}{formatarMoeda(transacao.valor)}
                            </span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transacao.status)}`}>
                              {getStatusText(transacao.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className='mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500'>
                          <span>{formatarData(transacao.data)}</span>
                          {transacao.metodoPagamento && (
                            <span className='font-medium'>{transacao.metodoPagamento}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}