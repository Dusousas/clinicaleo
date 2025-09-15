import React from 'react';
import { HelpCircle, Phone, MessageSquare, MessageCircle, ChevronRight } from 'lucide-react';

const SuportePage = () => {
  return (
    <div className="p-8 h-[100vh]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Suporte</h2>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajuda com cadastro, plano e pedidos</h2>
        <p className="text-gray-700 mb-6">
          Receba ajuda do time de atendimento em questões sobre a recorrência do seu plano, cadastro, pedidos, status
          de entrega, pagamento, entre outros.
        </p>
        
        <div className="space-y-4">
          <a href='/central-ajuda' className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <HelpCircle className="w-6 h-6 text-teal-600 mr-3" />
              <p className="font-medium text-gray-800">Central de Ajuda</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </a>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-green-600 mr-3" />
              <span className="font-medium text-gray-700">WhatsApp</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          

        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Dúvidas médicas</h2>
        <p className="text-gray-700 mb-6">
          Fale com o suporte clínico e tire dúvidas sobre os medicamentos e o tratamento (modo de uso, resultados,
          efeitos colaterais, entre outros)
        </p>

        <div  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 rounded-lg p-3 mr-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <a href=''>
                <h3 className="font-medium text-gray-800">Mensagens</h3>
                <p className="text-sm text-gray-500">Conversar com um especialista</p>
              </a>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuportePage;