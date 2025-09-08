import React from 'react';
import { Clock, Target, Moon, Smile } from 'lucide-react';

const InicioPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Boa tarde Eduardo!</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tarefas</h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 flex items-center">
          <div className="bg-teal-600 rounded-full p-2 mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Tudo certo!</h3>
            <p className="text-gray-600">Nenhuma tarefa no momento</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Adicionar uma nova meta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Disfunção Erétil</h3>
              <p className="text-sm text-gray-500">Sem planos ativos</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Target className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Queda de cabelo</h3>
              <p className="text-sm text-gray-500">Sem planos ativos</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Moon className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Sono</h3>
              <p className="text-sm text-gray-500">Sem planos ativos</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Smile className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Emagrecimento</h3>
              <p className="text-sm text-gray-500">Sem planos ativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioPage;