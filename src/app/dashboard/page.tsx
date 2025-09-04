"use client";

import { useRole } from "@/lib/hooks/useRole";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserRole, getRoleName } from "@/lib/utils/roles";
import Link from "next/link";
import { toast } from "sonner";

interface QuizResponse {
  id: string;
  responses: Record<string, unknown>;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, loading, isAdmin, isMedico, isPaciente } = useRole();
  const [quizResponse, setQuizResponse] = useState<QuizResponse | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(true);

  useEffect(() => {
    const checkQuizResponse = async () => {
      try {
        const response = await fetch("/api/quiz/check");
        if (response.ok) {
          const data = await response.json();
          if (data.hasResponse) {
            setQuizResponse(data.response);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar questionário:", error);
      } finally {
        setLoadingQuiz(false);
      }
    };

    if (!loading && user) {
      checkQuizResponse();
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-600 mb-6">
            Você precisa estar logado para acessar esta página.
          </p>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo, {user.name}! ({getRoleName(user.role as UserRole)})
          </p>
        </div>

        {/* Content based on role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Perfil do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">👤</span>
                Meu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {getRoleName(user.role as UserRole)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Questionário - Para Pacientes */}
          {isPaciente() && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">📋</span>
                  Questionário
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingQuiz ? (
                  <p>Verificando questionário...</p>
                ) : quizResponse ? (
                  <div className="space-y-4">
                    <p className="text-green-600 font-semibold">
                      ✅ Questionário concluído
                    </p>
                    <p className="text-sm text-gray-600">
                      Respondido em: {new Date(quizResponse.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="space-y-2">
                      <Link href="/quiz-results">
                        <Button variant="outline" className="w-full">
                          Ver Resultados
                        </Button>
                      </Link>
                      <Link href="/quiz">
                        <Button variant="outline" className="w-full">
                          Refazer Questionário
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-amber-600 font-semibold">
                      ⏳ Questionário pendente
                    </p>
                    <p className="text-sm text-gray-600">
                      Complete o questionário para obter recomendações personalizadas.
                    </p>
                    <Link href="/quiz">
                      <Button className="w-full">
                        Fazer Questionário
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Painel Admin */}
          {isAdmin() && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">⚙️</span>
                  Administração
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full">
                      Gerenciar Usuários
                    </Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="outline" className="w-full">
                      Relatórios
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Painel Médico */}
          {isMedico() && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">🩺</span>
                  Área Médica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Pacientes
                  </Button>
                  <Button variant="outline" className="w-full">
                    Consultas
                  </Button>
                  <Button variant="outline" className="w-full">
                    Prescrições
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">⚡</span>
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Suporte
                </Button>
                <Button variant="outline" className="w-full">
                  Configurações
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={() => {
                    // Implementar logout
                    toast.info("Logout em desenvolvimento...");
                  }}
                >
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
