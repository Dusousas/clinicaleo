import React, { useState } from 'react';

interface QuizResponse {
  id: string;
  paciente: {
    nome: string;
    email: string;
    idade: number;
    telefone: string;
  };
  medicamento: string;
  dataSubmissao: string;
  status: 'pendente' | 'aprovado' | 'negado';
  respostas: {
    pergunta: string;
    resposta: string;
  }[];
  observacoes?: string;
}

// Dados de exemplo
const consultasExemplo: QuizResponse[] = [
  {
    id: '1',
    paciente: {
      nome: 'Maria Silva',
      email: 'maria.silva@email.com',
      idade: 32,
      telefone: '(11) 99999-9999'
    },
    medicamento: 'Finasterida 1mg',
    dataSubmissao: '2024-03-15T14:30:00',
    status: 'pendente',
    respostas: [
      { pergunta: 'Você tem histórico de problemas cardíacos?', resposta: 'Não' },
      { pergunta: 'Está tomando algum medicamento atualmente?', resposta: 'Apenas vitaminas' },
      { pergunta: 'Já teve reações alérgicas a medicamentos?', resposta: 'Não' },
      { pergunta: 'Tem histórico familiar de calvície?', resposta: 'Sim, pai e avô paterno' },
    ]
  },
  {
    id: '2',
    paciente: {
      nome: 'João Santos',
      email: 'joao.santos@email.com',
      idade: 28,
      telefone: '(11) 88888-8888'
    },
    medicamento: 'Minoxidil 5%',
    dataSubmissao: '2024-03-15T10:15:00',
    status: 'aprovado',
    respostas: [
      { pergunta: 'Você tem histórico de problemas cardíacos?', resposta: 'Não' },
      { pergunta: 'Está tomando algum medicamento atualmente?', resposta: 'Não' },
      { pergunta: 'Já teve reações alérgicas a medicamentos?', resposta: 'Não' },
      { pergunta: 'Tem histórico familiar de calvície?', resposta: 'Sim' },
    ],
    observacoes: 'Paciente aprovado. Iniciar com aplicação 2x ao dia.'
  },
  {
    id: '3',
    paciente: {
      nome: 'Ana Costa',
      email: 'ana.costa@email.com',
      idade: 45,
      telefone: '(11) 77777-7777'
    },
    medicamento: 'Dutasterida 0.5mg',
    dataSubmissao: '2024-03-14T16:45:00',
    status: 'negado',
    respostas: [
      { pergunta: 'Você tem histórico de problemas cardíacos?', resposta: 'Sim, hipertensão' },
      { pergunta: 'Está tomando algum medicamento atualmente?', resposta: 'Losartana 50mg' },
      { pergunta: 'Já teve reações alérgicas a medicamentos?', resposta: 'Sim, penicilina' },
      { pergunta: 'Tem histórico familiar de calvície?', resposta: 'Não' },
    ],
    observacoes: 'Paciente com hipertensão. Recomendo consulta presencial antes de iniciar tratamento.'
  }
];

export default function Consultas() {
  const [consultas, setConsultas] = useState<QuizResponse[]>(consultasExemplo);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [consultaSelecionada, setConsultaSelecionada] = useState<QuizResponse | null>(null);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const consultasFiltradas = consultas.filter(consulta => {
    if (filtroStatus === 'todos') return true;
    return consulta.status === filtroStatus;
  });

  const atualizarStatus = (id: string, novoStatus: 'aprovado' | 'negado', observacoes?: string) => {
    setConsultas(prev => 
      prev.map(consulta => 
        consulta.id === id 
          ? { ...consulta, status: novoStatus, observacoes: observacoes || consulta.observacoes }
          : consulta
      )
    );
    setConsultaSelecionada(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'negado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'aprovado': return 'Aprovado';
      case 'negado': return 'Negado';
      default: return status;
    }
  };

  return (
    <>
      <section className='py-4 sm:py-6'>
        <div className='maxW px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Consultas</h1>
              <p className='text-gray-600 mt-1'>Avalie os questionários dos pacientes</p>
            </div>
            
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto'>
              <select 
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto'
              >
                <option value="todos">Todos os status</option>
                <option value="pendente">Pendentes</option>
                <option value="aprovado">Aprovados</option>
                <option value="negado">Negados</option>
              </select>
              
              <div className='bg-blue-50 px-3 py-2 rounded-lg w-full sm:w-auto text-center'>
                <span className='text-sm font-medium text-blue-700'>
                  {consultasFiltradas.length} consulta{consultasFiltradas.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Lista de Consultas */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
            {consultasFiltradas.length === 0 ? (
              <div className='p-8 text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>Nenhuma consulta encontrada</h3>
                <p className='text-gray-500'>Não há consultas com o filtro selecionado.</p>
              </div>
            ) : (
              <div className='divide-y divide-gray-200'>
                {consultasFiltradas.map((consulta) => (
                  <div key={consulta.id} className='p-6 hover:bg-gray-50 transition-colors'>
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                      <div className='flex-1 w-full'>
                        <div className='flex items-center gap-4 mb-3'>
                          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                            <span className='font-semibold text-blue-700'>
                              {consulta.paciente.nome.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          
                          <div className='flex-1'>
                            <h3 className='font-semibold text-gray-900'>{consulta.paciente.nome}</h3>
                            <p className='text-sm text-gray-500'>
                              {consulta.paciente.email} • {consulta.paciente.idade} anos
                            </p>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consulta.status)}`}>
                            {getStatusText(consulta.status)}
                          </span>
                        </div>
                        
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                          <div>
                            <span className='text-gray-500'>Medicamento:</span>
                            <span className='ml-2 font-medium'>{consulta.medicamento}</span>
                          </div>
                          <div>
                            <span className='text-gray-500'>Data:</span>
                            <span className='ml-2'>{formatarData(consulta.dataSubmissao)}</span>
                          </div>
                        </div>
                        
                        {consulta.observacoes && (
                          <div className='mt-3 p-3 bg-gray-50 rounded-lg'>
                            <p className='text-sm text-gray-700'><strong>Observações:</strong> {consulta.observacoes}</p>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setConsultaSelecionada(consulta)}
                        className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal de Detalhes */}
      {consultaSelecionada && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50'>
          <div className='bg-white rounded-xl shadow-lg w-full max-w-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col'>
            <div className='flex items-center justify-between p-4 sm:p-6 border-b'>
              <div>
                <h2 className='text-lg sm:text-xl font-bold text-gray-900'>Avaliação do Paciente</h2>
                <p className='text-gray-600'>{consultaSelecionada.paciente.nome}</p>
              </div>
              <button
                onClick={() => setConsultaSelecionada(null)}
                className='text-gray-400 hover:text-gray-600'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            
            <div className='p-4 sm:p-6 flex-1 overflow-y-auto'>
              <div className='space-y-6'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>Informações do Paciente</h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                    <div><span className='text-gray-500'>Nome:</span> <span className='ml-2'>{consultaSelecionada.paciente.nome}</span></div>
                    <div><span className='text-gray-500'>Idade:</span> <span className='ml-2'>{consultaSelecionada.paciente.idade} anos</span></div>
                    <div><span className='text-gray-500'>Email:</span> <span className='ml-2'>{consultaSelecionada.paciente.email}</span></div>
                    <div><span className='text-gray-500'>Telefone:</span> <span className='ml-2'>{consultaSelecionada.paciente.telefone}</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>Medicamento Solicitado</h3>
                  <p className='text-blue-700 font-medium'>{consultaSelecionada.medicamento}</p>
                </div>
                
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>Respostas do Questionário</h3>
                  <div className='space-y-4'>
                    {consultaSelecionada.respostas.map((item, index) => (
                      <div key={index} className='border-l-4 border-blue-200 pl-4'>
                        <p className='font-medium text-gray-900 mb-1'>{item.pergunta}</p>
                        <p className='text-gray-700'>{item.resposta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {consultaSelecionada.status === 'pendente' && (
              <div className='p-4 sm:p-6 border-t bg-gray-50'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Observações (opcional)
                  </label>
                  <textarea
                    id={`obs-${consultaSelecionada.id}`}
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Adicione observações sobre sua decisão...'
                  />
                </div>
                
                <div className='flex flex-col sm:flex-row gap-3'>
                  <button
                    onClick={() => {
                      const obs = (document.getElementById(`obs-${consultaSelecionada.id}`) as HTMLTextAreaElement)?.value;
                      atualizarStatus(consultaSelecionada.id, 'aprovado', obs);
                    }}
                    className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                  >
                    Aprovar Medicamento
                  </button>
                  <button
                    onClick={() => {
                      const obs = (document.getElementById(`obs-${consultaSelecionada.id}`) as HTMLTextAreaElement)?.value;
                      atualizarStatus(consultaSelecionada.id, 'negado', obs);
                    }}
                    className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                  >
                    Negar Medicamento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
