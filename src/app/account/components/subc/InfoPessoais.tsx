import React from 'react';
import { User, X, Mail, Phone, MapPin, Calendar, CreditCard, CheckCircle } from 'lucide-react';

interface UserData {
  nome: string;
  email: string;
  membro: string;
  telefone: string;
  endereco: string;
  plano: string;
  status: string;
}

interface InformacoesPessoaisModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

const InformacoesPessoaisModal: React.FC<InformacoesPessoaisModalProps> = ({ 
  isOpen, 
  onClose, 
  userData 
}) => {
  if (!isOpen) return null;

  const handleEditClick = (): void => {
    // Implementar lógica de edição
    console.log('Editar informações');
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header do modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Informações Pessoais</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6">
          {/* Avatar e nome */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-10 h-10 text-teal-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">{userData.nome}</h4>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">{userData.status}</span>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Mail className="w-5 h-5 text-teal-600" />
                <label className="text-sm font-medium text-gray-600">Email</label>
              </div>
              <p className="text-gray-900 ml-8">{userData.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Phone className="w-5 h-5 text-teal-600" />
                <label className="text-sm font-medium text-gray-600">Telefone</label>
              </div>
              <p className="text-gray-900 ml-8">{userData.telefone}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                <label className="text-sm font-medium text-gray-600">Localização</label>
              </div>
              <p className="text-gray-900 ml-8">{userData.endereco}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <label className="text-sm font-medium text-gray-600">Plano</label>
              </div>
              <p className="text-gray-900 ml-8">{userData.plano}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <label className="text-sm font-medium text-gray-600">Membro desde</label>
              </div>
              <p className="text-gray-900 ml-8">Janeiro 2025</p>
            </div>
          </div>
        </div>

        {/* Footer do modal */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">

            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesPessoaisModal;