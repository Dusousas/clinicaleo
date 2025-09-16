"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Avaliacao {
  id: string;
  status: "pendente" | "aprovado" | "negado";
  statusOriginal: string;
  medicamento: string;
  respostas: Array<{ pergunta: string; resposta: string }>;
  caminhoFoto?: string;
  motivoNegativa?: string;
  notasMedicas?: string;
  submetidoEm: string;
  avaliadoEm?: string;
  medico?: {
    id: string;
    nome: string;
  };
}

const AvaliacoesPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarAvaliacoes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/avaliacoes");

        if (!response.ok) {
          throw new Error("Erro ao buscar avaliações");
        }

        const data = await response.json();
        setAvaliacoes(data.data || []);
      } catch (err) {
        setError("Erro ao carregar avaliações");
        console.error("Erro:", err);
      } finally {
        setIsLoading(false);
      }
    };

    buscarAvaliacoes();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "negado":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200";
      case "negado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "aprovado":
        return "Aprovado";
      case "negado":
        return "Negado";
      default:
        return "Pendente";
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando avaliações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Minhas Avaliações Médicas
        </h2>
        <p className="text-gray-600">
          Acompanhe o status das suas avaliações médicas e prescrições.
        </p>
      </div>

      {avaliacoes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma avaliação encontrada
          </h3>
          <p className="text-gray-600">
            Você ainda não possui avaliações médicas. Complete um questionário
            para solicitar uma avaliação.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {avaliacoes.map((avaliacao) => (
            <div
              key={avaliacao.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Cabeçalho da avaliação */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(avaliacao.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Avaliação #{avaliacao.id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Medicamento: {avaliacao.medicamento}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    avaliacao.status
                  )}`}
                >
                  {getStatusText(avaliacao.status)}
                </span>
              </div>

              {/* Informações de data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Submetido em: {formatarData(avaliacao.submetidoEm)}
                  </span>
                </div>
                {avaliacao.avaliadoEm && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      Avaliado em: {formatarData(avaliacao.avaliadoEm)}
                    </span>
                  </div>
                )}
              </div>

              {/* Médico responsável */}
              {avaliacao.medico && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <User className="w-4 h-4" />
                  <span>
                    Médico responsável: Dr(a). {avaliacao.medico.nome}
                  </span>
                </div>
              )}

              {/* Notas médicas */}
              {avaliacao.notasMedicas && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Notas Médicas:
                  </h4>
                  <p className="text-blue-800">{avaliacao.notasMedicas}</p>
                </div>
              )}

              {/* Motivo da negativa */}
              {avaliacao.status === "negado" && avaliacao.motivoNegativa && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-red-900 mb-2">
                    Motivo da Negativa:
                  </h4>
                  <p className="text-red-800">{avaliacao.motivoNegativa}</p>
                </div>
              )}

              {/* Respostas do questionário */}
              {avaliacao.respostas && avaliacao.respostas.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Respostas do Questionário:
                  </h4>
                  <div className="space-y-2">
                    {avaliacao.respostas.map((resposta, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {resposta.pergunta}
                        </p>
                        <p className="text-sm text-gray-600">
                          {resposta.resposta}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvaliacoesPage;
