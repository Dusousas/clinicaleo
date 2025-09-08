import React from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Bell, Shield, ChevronRight } from 'lucide-react';

const ContaPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">Conta</h1>
      
      {/* Informações do usuário */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-teal-100 rounded-full p-4 mr-4">
            <User className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Eduardo Silva</h3>
            <p className="text-gray-500">Membro desde Janeiro 2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">eduardo@email.com</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium text-gray-800">(11) 99999-9999</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações da conta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Configurações Pessoais</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Informações Pessoais</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Endereço</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Notificações</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Assinatura e Pagamento</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Métodos de Pagamento</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Segurança</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Status da assinatura */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="font-medium text-green-800">Plano Ativo</p>
                <p className="text-sm text-green-600">Próxima cobrança em 15 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações da conta */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações da Conta</h2>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Editar Perfil
          </button>
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Alterar Senha
          </button>
          
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Desativar Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContaPage;