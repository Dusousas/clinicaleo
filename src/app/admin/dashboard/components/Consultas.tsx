"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

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
  status: "pendente" | "aprovado" | "negado";
  respostas: {
    pergunta: string;
    resposta: string;
  }[];
  observacoes?: string;
  motivoNegativa?: string;
  foto?: string;
  medico?: string;
  avaliadoEm?: string;
}

interface Produto {
  id: string;
  nome: string;
  preco: string; // Decimal vem como string do Prisma
  descricao?: string;
}

export default function Consultas() {
  const [consultas, setConsultas] = useState<QuizResponse[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [pesquisaNome, setPesquisaNome] = useState<string>("");
  const [consultaSelecionada, setConsultaSelecionada] =
    useState<QuizResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({
    medicamento: "",
    observacoes: "",
  });

  // Carregar consultas do banco de dados
  const carregarConsultas = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filtroStatus !== "todos") {
        params.append("status", filtroStatus);
      }

      const response = await fetch(`/api/admin/avaliacoes?${params}`);
      if (response.ok) {
        const data = await response.json();
        setConsultas(data.consultas || []);
      } else {
        toast.error("Erro ao carregar consultas");
      }
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }, [filtroStatus]);

  // Carregar produtos disponíveis
  const carregarProdutos = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/produtos");
      if (response.ok) {
        const data = await response.json();
        setProdutos(data.produtos || []);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }, []);

  useEffect(() => {
    carregarConsultas();
    carregarProdutos();
  }, [carregarConsultas, carregarProdutos]);

  // Iniciar edição de consulta
  const iniciarEdicao = (consulta: QuizResponse) => {
    setModoEdicao(true);
    setDadosEdicao({
      medicamento: consulta.medicamento,
      observacoes: consulta.observacoes || "",
    });
  };

  // Salvar edições
  const salvarEdicao = async () => {
    if (!consultaSelecionada) return;

    try {
      setIsUpdating(true);
      const response = await fetch("/api/admin/avaliacoes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: consultaSelecionada.id,
          medicamento: dadosEdicao.medicamento,
          observacoes: dadosEdicao.observacoes,
        }),
      });

      if (response.ok) {
        toast.success("Consulta atualizada com sucesso!");
        setModoEdicao(false);
        await carregarConsultas();
        // Atualizar a consulta selecionada
        setConsultaSelecionada({
          ...consultaSelecionada,
          medicamento: dadosEdicao.medicamento,
          observacoes: dadosEdicao.observacoes,
        });
      } else {
        toast.error("Erro ao atualizar consulta");
      }
    } catch (error) {
      console.error("Erro ao atualizar consulta:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsUpdating(false);
    }
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setModoEdicao(false);
    if (consultaSelecionada) {
      setDadosEdicao({
        medicamento: consultaSelecionada.medicamento,
        observacoes: consultaSelecionada.observacoes || "",
      });
    }
  };

  const atualizarStatusConsulta = async (
    id: string,
    novoStatus: "aprovado" | "negado",
    observacoes?: string
  ) => {
    try {
      setIsUpdating(true);

      const response = await fetch("/api/admin/avaliacoes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: novoStatus,
          observacoes,
          motivoNegativa: novoStatus === "negado" ? observacoes : undefined,
        }),
      });

      if (response.ok) {
        toast.success(
          `Consulta ${
            novoStatus === "aprovado" ? "aprovada" : "negada"
          } com sucesso!`
        );
        await carregarConsultas(); // Recarregar a lista
        setConsultaSelecionada(null); // Fechar modal
      } else {
        toast.error("Erro ao atualizar status da consulta");
      }
    } catch (error) {
      console.error("Erro ao atualizar consulta:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsUpdating(false);
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

  const consultasFiltradas = consultas.filter((consulta) => {
    // Filtro por status
    const passaFiltroStatus =
      filtroStatus === "todos" || consulta.status === filtroStatus;

    // Filtro por nome (busca case-insensitive)
    const passaFiltroPesquisa =
      pesquisaNome === "" ||
      consulta.paciente.nome.toLowerCase().includes(pesquisaNome.toLowerCase());

    return passaFiltroStatus && passaFiltroPesquisa;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "negado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "aprovado":
        return "Aprovado";
      case "negado":
        return "Negado";
      default:
        return status;
    }
  };

  return (
    <>
      <section className="py-4 sm:py-6">
        <div className="maxW px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Consultas</h2>
              <p className="text-gray-700 mt-1">
                Avalie os questionários dos pacientes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <div className="bg-blue-50 px-3 py-2 rounded-lg w-full sm:w-auto text-center">
                <span className="text-sm font-medium text-blue-700">
                  {consultasFiltradas.length} consulta
                  {consultasFiltradas.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar por nome do paciente..."
                  value={pesquisaNome}
                  onChange={(e) => setPesquisaNome(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto"
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovado">Aprovados</option>
              <option value="negado">Negados</option>
            </select>
          </div>

          {/* Lista de Consultas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Carregando consultas...
                </h3>
                <p className="text-gray-500">
                  Aguarde enquanto buscamos os dados.
                </p>
              </div>
            ) : consultasFiltradas.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma consulta encontrada
                </h3>
                <p className="text-gray-500">
                  {pesquisaNome
                    ? `Não há consultas que correspondam à pesquisa "${pesquisaNome}".`
                    : "Não há consultas com o filtro selecionado."}
                </p>
                {pesquisaNome && (
                  <button
                    onClick={() => setPesquisaNome("")}
                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Limpar pesquisa
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {consultasFiltradas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-700">
                              {consulta.paciente.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {consulta.paciente.nome}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {consulta.paciente.email} •{" "}
                              {consulta.paciente.idade} anos
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              consulta.status
                            )}`}
                          >
                            {getStatusText(consulta.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Medicamento:</span>
                            <span className="ml-2 font-medium">
                              {consulta.medicamento}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Data:</span>
                            <span className="ml-2">
                              {formatarData(consulta.dataSubmissao)}
                            </span>
                          </div>
                        </div>

                        {consulta.observacoes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Observações:</strong>{" "}
                              {consulta.observacoes}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setConsultaSelecionada(consulta)}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Avaliação do Paciente
                </h2>
                <p className="text-gray-600">
                  {consultaSelecionada.paciente.nome}
                </p>
              </div>
              <button
                onClick={() => setConsultaSelecionada(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Informações do Paciente
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Nome:</span>{" "}
                      <span className="ml-2">
                        {consultaSelecionada.paciente.nome}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Idade:</span>{" "}
                      <span className="ml-2">
                        {consultaSelecionada.paciente.idade} anos
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>{" "}
                      <span className="ml-2">
                        {consultaSelecionada.paciente.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Telefone:</span>{" "}
                      <span className="ml-2">
                        {consultaSelecionada.paciente.telefone}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Medicamento Solicitado
                    </h3>
                    {consultaSelecionada.status === "pendente" &&
                      !modoEdicao && (
                        <button
                          onClick={() => iniciarEdicao(consultaSelecionada)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          ✏️ Editar
                        </button>
                      )}
                  </div>

                  {modoEdicao ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecionar Medicamento/Produto
                        </label>
                        <select
                          value={dadosEdicao.medicamento}
                          onChange={(e) =>
                            setDadosEdicao({
                              ...dadosEdicao,
                              medicamento: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Selecione um produto</option>
                          {produtos.map((produto) => (
                            <option key={produto.id} value={produto.nome}>
                              {produto.nome} - R${" "}
                              {parseFloat(produto.preco).toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observações
                        </label>
                        <textarea
                          value={dadosEdicao.observacoes}
                          onChange={(e) =>
                            setDadosEdicao({
                              ...dadosEdicao,
                              observacoes: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Adicione observações sobre o medicamento..."
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={salvarEdicao}
                          disabled={isUpdating || !dadosEdicao.medicamento}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isUpdating ? "Salvando..." : "💾 Salvar"}
                        </button>
                        <button
                          onClick={cancelarEdicao}
                          disabled={isUpdating}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          ❌ Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-blue-700 font-medium">
                        {consultaSelecionada.medicamento}
                      </p>
                      {consultaSelecionada.observacoes && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Observações:</strong>{" "}
                            {consultaSelecionada.observacoes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Respostas do Questionário
                  </h3>
                  <div className="space-y-4">
                    {consultaSelecionada.respostas.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-200 pl-4"
                      >
                        <p className="font-medium text-gray-900 mb-1">
                          {item.pergunta}
                        </p>
                        <p className="text-gray-700">{item.resposta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {consultaSelecionada.status === "pendente" && (
              <div className="p-4 sm:p-6 border-t bg-gray-50">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    id={`obs-${consultaSelecionada.id}`}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adicione observações sobre sua decisão..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={async () => {
                      const obs = (
                        document.getElementById(
                          `obs-${consultaSelecionada.id}`
                        ) as HTMLTextAreaElement
                      )?.value;
                      await atualizarStatusConsulta(
                        consultaSelecionada.id,
                        "aprovado",
                        obs
                      );
                    }}
                    disabled={isUpdating}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Aprovando..." : "Aprovar Medicamento"}
                  </button>
                  <button
                    onClick={async () => {
                      const obs = (
                        document.getElementById(
                          `obs-${consultaSelecionada.id}`
                        ) as HTMLTextAreaElement
                      )?.value;
                      await atualizarStatusConsulta(
                        consultaSelecionada.id,
                        "negado",
                        obs
                      );
                    }}
                    disabled={isUpdating}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Negando..." : "Negar Medicamento"}
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
