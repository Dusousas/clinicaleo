import React, { useState } from 'react';
import { Plus, Calendar, Image, X, Eye } from 'lucide-react';

type Foto = {
  id: number;
  src: string;
  data: string;
  titulo: string;
};

const EvolucaoPage = () => {
  const [fotos, setFotos] = useState<Foto[]>([
    {
      id: 1,
      src: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Foto+1',
      data: '2025-08-01',
      titulo: 'Início do tratamento'
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Foto+2',
      data: '2025-08-15',
      titulo: '2 semanas'
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Foto+3',
      data: '2025-09-01',
      titulo: '1 mês'
    }
  ]);
  
  const [fotoSelecionada, setFotoSelecionada] = useState<Foto | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const adicionarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const arquivo = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return;
        const novaFoto: Foto = {
          id: Date.now(),
          src: e.target.result as string,
          data: new Date().toISOString().split('T')[0],
          titulo: `Progresso ${fotos.length + 1}`
        };
        setFotos([...fotos, novaFoto]);
      };
      reader.readAsDataURL(arquivo);
    }
  };

  const removerFoto = (id: number) => {
    setFotos(fotos.filter(foto => foto.id !== id));
  };

  const visualizarFoto = (foto: Foto) => {
    setFotoSelecionada(foto);
    setMostrarModal(true);
  };

  const formatarData = (data: string | number | Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="p-8  min-h-screen">
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Minha evolução</h2>
        <p className="text-gray-700 mb-8">Acompanhe seu progresso através de fotos</p>
        
        <div className="mb-8">
          <label className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg cursor-pointer hover:bg-teal-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Nova Foto
            <input
              type="file"
              accept="image/*"
              onChange={adicionarFoto}
              className="hidden"
            />
          </label>
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fotos.map((foto, index) => (
            <div key={foto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={foto.src}
                  alt={foto.titulo}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay com ações */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => visualizarFoto(foto)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Visualizar"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => removerFoto(foto.id)}
                      className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      title="Remover"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                
                {/* Badge de progresso */}
                <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  #{index + 1}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{foto.titulo}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatarData(foto.data)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Card para adicionar primeira foto (quando não há fotos) */}
          {fotos.length === 0 && (
            <div className="col-span-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-12 h-12 mb-4 text-teal-500" />
                  <p className="mb-2 text-lg text-teal-600 font-medium">Adicione sua primeira foto</p>
                  <p className="text-sm text-teal-500">Clique aqui para começar seu acompanhamento</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={adicionarFoto}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Modal para visualizar foto */}
      {mostrarModal && fotoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{fotoSelecionada.titulo}</h3>
                <p className="text-sm text-gray-500">{formatarData(fotoSelecionada.data)}</p>
              </div>
              <button
                onClick={() => setMostrarModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={fotoSelecionada.src}
                alt={fotoSelecionada.titulo}
                className="max-w-full max-h-96 mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolucaoPage;