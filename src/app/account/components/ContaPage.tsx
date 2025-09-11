import React from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Bell, Shield, ChevronRight } from 'lucide-react';

const ContaPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Conta</h2>

      {/* Informações do usuário */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-teal-100 rounded-full p-4 mr-4">
            <User className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Eduardo Sousa</h3>
            <p className="text-gray-700">Membro desde Janeiro 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-700">du.brotas@hotmail.com</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium text-gray-700">(11) 99999-9999</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações da conta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Configurações Pessoais</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Informações Pessoais</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Documentos do tratamento</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Assinatura e Pagamento</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Métodos de Pagamento</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Histórico de Pedidos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>


          </div>


        </div>
      </div>

      {/* Ações da conta */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Ações da Conta</h2>

        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Editar Perfil
          </button>

          <button className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Alterar Senha
          </button>

          <button className="px-4 py-2 cursor-pointer border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Desativar Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContaPage;