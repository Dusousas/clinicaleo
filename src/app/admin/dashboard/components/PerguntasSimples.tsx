"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  perguntaComOpcoesSchema,
  validateForm,
} from "@/lib/validations/schemas";

interface Pergunta {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: string;
  opcoes?: string[];
  obrigatoria: boolean;
  ordem: number;
  ativa: boolean;
}

const tiposPergunta = [
  { value: "MULTIPLA_ESCOLHA", label: "Múltipla Escolha", needsOptions: true },
  { value: "TEXTO_LIVRE", label: "Texto Livre", needsOptions: false },
  { value: "NUMERO", label: "Número", needsOptions: false },
  { value: "ESCALA_1_10", label: "Escala 1-10", needsOptions: false },
  { value: "SIM_NAO", label: "Sim/Não", needsOptions: true },
  { value: "EMAIL", label: "Email", needsOptions: false },
  { value: "TELEFONE", label: "Telefone", needsOptions: false },
  { value: "DATA", label: "Data", needsOptions: false },
];

export default function PerguntasSimples() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAddPerguntaForm, setShowAddPerguntaForm] = useState(false);
  const [questionarioId, setQuestionarioId] = useState<string | null>(null);

  const [newPergunta, setNewPergunta] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    opcoes: [] as string[],
    obrigatoria: true,
    ordem: "0",
  });

  // Buscar ou criar questionário padrão e carregar perguntas
  const inicializarQuestionario = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/questionarios");
      if (response.ok) {
        const data = await response.json();
        const questionariosData = data.questionarios || [];

        if (questionariosData.length > 0) {
          // Usar o primeiro questionário
          setQuestionarioId(questionariosData[0].id);
          setPerguntas(questionariosData[0].perguntas || []);
        } else {
          // Criar questionário padrão se não existir
          const createResponse = await fetch("/api/admin/questionarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              titulo: "Avaliação Médica",
              descricao: "Questionário padrão para avaliações médicas",
              tipo: "AVALIACAO_INICIAL",
              ordem: "0",
            }),
          });

          if (createResponse.ok) {
            const newQuestionario = await createResponse.json();
            setQuestionarioId(newQuestionario.id);
            setPerguntas([]);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao inicializar questionário:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    inicializarQuestionario();
  }, [inicializarQuestionario]);

  const carregarPerguntas = async () => {
    await inicializarQuestionario();
  };

  const adicionarOpcao = () => {
    setNewPergunta((prev) => ({
      ...prev,
      opcoes: [...prev.opcoes, ""],
    }));
  };

  const removerOpcao = (index: number) => {
    setNewPergunta((prev) => ({
      ...prev,
      opcoes: prev.opcoes.filter((_, i) => i !== index),
    }));
  };

  const atualizarOpcao = (index: number, valor: string) => {
    setNewPergunta((prev) => ({
      ...prev,
      opcoes: prev.opcoes.map((opcao, i) => (i === index ? valor : opcao)),
    }));
  };

  const adicionarPergunta = async () => {
    // Preparar dados para validação
    const dadosParaValidacao = {
      titulo: newPergunta.titulo,
      descricao: newPergunta.descricao,
      tipo: newPergunta.tipo as
        | "MULTIPLA_ESCOLHA"
        | "TEXTO_LIVRE"
        | "NUMERO"
        | "ESCALA_1_10"
        | "SIM_NAO"
        | "EMAIL"
        | "TELEFONE"
        | "DATA",
      opcoes: newPergunta.opcoes.filter((o) => o.trim()),
      obrigatoria: newPergunta.obrigatoria,
      ordem: parseInt(newPergunta.ordem) || 0,
      questionario_id: questionarioId || "",
    };

    // Validar com Zod
    const validationResult = validateForm(
      perguntaComOpcoesSchema,
      dadosParaValidacao
    );

    if (!validationResult.success) {
      // Mostrar primeiro erro encontrado
      const primeiroErro = Object.values(validationResult.errors)[0];
      toast.error(primeiroErro || "Erro de validação");
      return;
    }

    const tipoPergunta = tiposPergunta.find(
      (t) => t.value === newPergunta.tipo
    );

    try {
      setIsUpdating(true);
      const response = await fetch("/api/admin/perguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: newPergunta.titulo,
          descricao: newPergunta.descricao,
          tipo: newPergunta.tipo,
          obrigatoria: newPergunta.obrigatoria,
          ordem: parseInt(newPergunta.ordem) || 0,
          questionario_id: questionarioId,
          opcoes: tipoPergunta?.needsOptions
            ? newPergunta.opcoes.filter((o) => o.trim())
            : null,
        }),
      });

      if (response.ok) {
        toast.success("Pergunta adicionada com sucesso!");
        setNewPergunta({
          titulo: "",
          descricao: "",
          tipo: "",
          obrigatoria: true,
          ordem: "0",
          opcoes: [],
        });
        setShowAddPerguntaForm(false);
        await carregarPerguntas();
      } else {
        toast.error("Erro ao adicionar pergunta");
      }
    } catch (error) {
      console.error("Erro ao adicionar pergunta:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="maxW py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando perguntas...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="maxW py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciamento de Perguntas
          </h1>
          <p className="text-gray-600">
            Crie e gerencie perguntas para avaliações médicas com opções
            personalizadas
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Lista de Perguntas
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                {perguntas.length} pergunta(s) cadastrada(s)
              </p>
            </div>
            <button
              onClick={() => {
                setShowAddPerguntaForm(true);
                setNewPergunta({
                  titulo: "",
                  descricao: "",
                  tipo: "",
                  obrigatoria: true,
                  ordem: "0",
                  opcoes: [],
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Adicionar Pergunta
            </button>
          </div>

          {/* Formulário para adicionar pergunta */}
          {showAddPerguntaForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="font-medium mb-4">Nova Pergunta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Pergunta *
                  </label>
                  <input
                    type="text"
                    value={newPergunta.titulo}
                    onChange={(e) =>
                      setNewPergunta({ ...newPergunta, titulo: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite a pergunta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Pergunta *
                  </label>
                  <select
                    value={newPergunta.tipo}
                    onChange={(e) => {
                      const novoTipo = e.target.value;
                      setNewPergunta({
                        ...newPergunta,
                        tipo: novoTipo,
                        opcoes: tiposPergunta.find((t) => t.value === novoTipo)
                          ?.needsOptions
                          ? [""]
                          : [],
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione um tipo</option>
                    {tiposPergunta.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  value={newPergunta.descricao}
                  onChange={(e) =>
                    setNewPergunta({
                      ...newPergunta,
                      descricao: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição adicional da pergunta"
                />
              </div>

              {/* Opções para perguntas que precisam */}
              {tiposPergunta.find((t) => t.value === newPergunta.tipo)
                ?.needsOptions && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opções de Resposta *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Adicione as opções que o paciente pode escolher. Exemplos:
                    &quot;Sim&quot;, &quot;Não&quot;, &quot;Às vezes&quot;,
                    &quot;Nunca&quot;, etc.
                  </p>
                  {newPergunta.opcoes.map((opcao, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={opcao}
                        onChange={(e) => atualizarOpcao(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={
                          index === 0
                            ? "Ex: Sim"
                            : index === 1
                            ? "Ex: Não"
                            : index === 2
                            ? "Ex: Às vezes"
                            : `Opção ${index + 1}`
                        }
                      />
                      {newPergunta.opcoes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removerOpcao(index)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                          title="Remover esta opção"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={adicionarOpcao}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm font-medium"
                    >
                      + Adicionar Opção
                    </button>
                    {newPergunta.opcoes.length === 1 &&
                      newPergunta.opcoes[0] === "" && (
                        <div className="flex gap-1 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              setNewPergunta({
                                ...newPergunta,
                                opcoes: ["Sim", "Não"],
                              })
                            }
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-xs"
                          >
                            Sim/Não
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setNewPergunta({
                                ...newPergunta,
                                opcoes: [
                                  "Nunca",
                                  "Raramente",
                                  "Às vezes",
                                  "Frequentemente",
                                  "Sempre",
                                ],
                              })
                            }
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-xs"
                          >
                            Escala Frequência
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setNewPergunta({
                                ...newPergunta,
                                opcoes: [
                                  "Muito baixo",
                                  "Baixo",
                                  "Médio",
                                  "Alto",
                                  "Muito alto",
                                ],
                              })
                            }
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-xs"
                          >
                            Escala Intensidade
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPergunta.obrigatoria}
                    onChange={(e) =>
                      setNewPergunta({
                        ...newPergunta,
                        obrigatoria: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Pergunta obrigatória
                  </span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordem
                  </label>
                  <input
                    type="number"
                    value={newPergunta.ordem}
                    onChange={(e) =>
                      setNewPergunta({ ...newPergunta, ordem: e.target.value })
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={adicionarPergunta}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Salvando..." : "Salvar Pergunta"}
                </button>
                <button
                  onClick={() => {
                    setShowAddPerguntaForm(false);
                    setNewPergunta({
                      titulo: "",
                      descricao: "",
                      tipo: "",
                      obrigatoria: true,
                      ordem: "0",
                      opcoes: [],
                    });
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de perguntas */}
          {perguntas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <p className="text-gray-500 text-center">
                Nenhuma pergunta encontrada. Clique em &quot;Adicionar
                Pergunta&quot; para começar.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {perguntas.map((pergunta, index) => (
                  <div key={pergunta.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {index + 1}. {pergunta.titulo}
                        </h4>
                        {pergunta.descricao && (
                          <p className="text-gray-600 text-sm mt-1">
                            {pergunta.descricao}
                          </p>
                        )}
                        {pergunta.opcoes &&
                          Array.isArray(pergunta.opcoes) &&
                          pergunta.opcoes.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">
                                Opções:
                              </p>
                              <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                {pergunta.opcoes.map((opcao, i) => (
                                  <li key={i}>{opcao}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {tiposPergunta.find(
                              (t) => t.value === pergunta.tipo
                            )?.label || pergunta.tipo}
                          </span>
                          {pergunta.obrigatoria && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                              Obrigatória
                            </span>
                          )}
                          {!pergunta.ativa && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                              Inativa
                            </span>
                          )}
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            Ordem: {pergunta.ordem}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
