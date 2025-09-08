import React from 'react';
import { TrendingUp, Calendar, BarChart3, Activity, Target } from 'lucide-react';

const EvolucaoPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Evolução</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Card de estatísticas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-teal-100 rounded-lg p-2">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">85%</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Progresso Geral</h3>
          <p className="text-sm text-gray-500">Meta atingida este mês</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 rounded-lg p-2">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">12</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Dias Consecutivos</h3>
          <p className="text-sm text-gray-500">Seguindo o tratamento</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 rounded-lg p-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">+15%</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Melhoria</h3>
          <p className="text-sm text-gray-500">Comparado ao mês anterior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de progresso */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Progresso Semanal</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Simulação de um gráfico simples */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Segunda</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-800">80%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Terça</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-800">95%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quarta</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-800">70%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quinta</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-800">90%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sexta</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-800">85%</span>
            </div>
          </div>
        </div>

        {/* Histórico recente */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Histórico Recente</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Medicação tomada</p>
                <p className="text-xs text-gray-500">Hoje, 08:30</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Consulta agendada</p>
                <p className="text-xs text-gray-500">Ontem, 14:00</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Meta semanal atingida</p>
                <p className="text-xs text-gray-500">2 dias atrás</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Novo plano iniciado</p>
                <p className="text-xs text-gray-500">1 semana atrás</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolucaoPage;