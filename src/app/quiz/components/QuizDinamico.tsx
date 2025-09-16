"use client";

import React, { useState, useEffect } from "react";
import { useQuizManager } from "@/lib/hooks/useQuizManager";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

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

// Schema dinâmico baseado no tipo de pergunta
const createQuestionSchema = (question: Pergunta) => {
  if (!question.opcoes || question.opcoes.length === 0) {
    // Para perguntas de texto livre
    return z.object({
      answer: question.obrigatoria
        ? z
            .string()
            .min(1, "Esta pergunta é obrigatória.")
            .min(5, "Resposta deve ter pelo menos 5 caracteres.")
            .max(1000, "Resposta deve ter no máximo 1000 caracteres.")
        : z
            .string()
            .max(1000, "Resposta deve ter no máximo 1000 caracteres.")
            .optional(),
    });
  } else {
    // Para perguntas de múltipla escolha
    return z.object({
      answer: question.obrigatoria
        ? z.string().min(1, "Esta pergunta é obrigatória.")
        : z.string().optional(),
    });
  }
};

export default function QuizDinamico() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<{ [key: string]: string }>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = perguntas[currentQuestionIndex];

  // Criar schema dinâmico para a pergunta atual
  const questionSchema = currentQuestion
    ? createQuestionSchema(currentQuestion)
    : z.object({ answer: z.string().optional() });

  // Form para a pergunta atual
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      answer: allAnswers[currentQuestion?.id] || "",
    },
  });

  // Reset form quando mudamos de pergunta
  useEffect(() => {
    if (currentQuestion) {
      form.reset({
        answer: allAnswers[currentQuestion.id] || "",
      });
    }
  }, [currentQuestionIndex, currentQuestion, allAnswers, form]);

  const { saveQuizResponses } = useQuizManager({
    quizType: "medical_evaluation",
    onCompleted: () => {
      // Você pode redirecionar para uma página específica
    },
  });

  // Carregar perguntas do banco
  useEffect(() => {
    const carregarPerguntas = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/quiz/perguntas");
        if (response.ok) {
          const data = await response.json();
          const perguntasAtivas = data.perguntas.filter(
            (p: Pergunta) => p.ativa
          );
          setPerguntas(
            perguntasAtivas.sort(
              (a: Pergunta, b: Pergunta) => a.ordem - b.ordem
            )
          );
        } else {
          setError("Erro ao carregar perguntas");
        }
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setError("Erro ao conectar com o servidor");
      } finally {
        setIsLoading(false);
      }
    };

    carregarPerguntas();
  }, []);

  // Submit da pergunta atual
  const onSubmitAnswer = (data: { answer?: string }) => {
    const answer = data.answer || "";

    const newAnswers = {
      ...allAnswers,
      [currentQuestion.id]: answer,
    };

    setAllAnswers(newAnswers);

    // Delay para feedback visual
    setTimeout(() => {
      if (currentQuestionIndex < perguntas.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Quiz completo, salvar as respostas
        handleQuizCompletion(newAnswers);
      }
    }, 300);
  };

  const handleQuizCompletion = async (finalAnswers: {
    [key: string]: string;
  }) => {
    setIsQuizCompleted(true);

    // Salvar as respostas no banco de dados
    const result = await saveQuizResponses(finalAnswers);

    if (!result.success) {
      console.error("Erro ao salvar respostas:", result.error);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="text-center p-6">
          <CardContent>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando perguntas...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (perguntas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Nenhuma pergunta disponível no momento.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Recarregar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800 mb-2">
                Quiz Concluído!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Suas respostas foram salvas com sucesso. Nossa equipe médica
                analisará suas informações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full"
                size="lg"
              >
                Voltar ao Início
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Fazer Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderQuestionForm = () => {
    if (!currentQuestion) return null;

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitAnswer)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                {!currentQuestion.opcoes ||
                currentQuestion.opcoes.length === 0 ? (
                  // Para perguntas de texto livre
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Digite sua resposta..."
                      className="min-h-[120px] resize-none"
                      maxLength={1000}
                    />
                  </FormControl>
                ) : (
                  // Para perguntas de múltipla escolha
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-3"
                    >
                      {currentQuestion.opcoes.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                          onClick={() => field.onChange(option)}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                          />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 cursor-pointer text-gray-700"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} de {perguntas.length}
            </span>

            <Button type="submit" className="flex items-center space-x-2">
              <span>
                {currentQuestionIndex === perguntas.length - 1
                  ? "Finalizar"
                  : "Próxima"}
              </span>
              {currentQuestionIndex === perguntas.length - 1 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentQuestionIndex + 1} de {perguntas.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(
                ((currentQuestionIndex + 1) / perguntas.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / perguntas.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              {currentQuestion.titulo}
            </CardTitle>
            {currentQuestion.descricao && (
              <CardDescription className="text-gray-600">
                {currentQuestion.descricao}
              </CardDescription>
            )}
            {currentQuestion.obrigatoria && (
              <div className="flex items-center space-x-2">
                <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium">
                  Obrigatória
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>{renderQuestionForm()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
