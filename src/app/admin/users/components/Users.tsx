"use client";

import { useState, useEffect, useMemo } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { UserRole, getRoleName } from "@/lib/utils/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <AdminUsersContent />
    </RoleGuard>
  );
}

function AdminUsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar usuários baseado no termo de pesquisa
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");

      if (!response.ok) {
        throw new Error("Erro ao carregar usuários");
      }

      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      setUpdating(userId);

      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar role");
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Role atualizado com sucesso!");
        fetchUsers(); // Recarregar a lista
      }
    } catch (error) {
      console.error("Erro ao atualizar role:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar role"
      );
    } finally {
      setUpdating(null);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 maxW">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="">
      <div className="maxW">
        <div className="mb-6">
          <h2 className="font-bold">Gerenciar Usuários</h2>
          <p className="text-gray-700">Visualize e gerencie os roles dos usuários do sistema.</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg">
                Lista de Usuários ({filteredUsers.length})
                {searchTerm && (
                  <span className="text-sm text-gray-500 ml-2">
                    de {users.length} total
                  </span>
                )}
              </h3>
              
              {/* Campo de pesquisa */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Pesquisar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {highlightSearchTerm(user.name, searchTerm)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {highlightSearchTerm(user.email, searchTerm)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {Object.values(UserRole).map((role) => (
                        <Button
                          key={role}
                          size="sm"
                          variant={user.role === role ? "default" : "outline"}
                          disabled={user.role === role || updating === user.id}
                          onClick={() => updateUserRole(user.id, role)}
                          className="mr-2 mb-1"
                        >
                          {updating === user.id ? "..." : getRoleName(role)}
                        </Button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-8">
              {searchTerm ? (
                <div>
                  <p className="text-gray-500 mb-2">
                    Nenhum usuário encontrado para "{searchTerm}"
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSearch}
                  >
                    Limpar pesquisa
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum usuário encontrado.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getRoleColor(role: UserRole): string {
  const colors = {
    [UserRole.ADMIN]: "bg-red-100 text-red-800",
    [UserRole.MEDICO]: "bg-blue-100 text-blue-800",
    [UserRole.PACIENTE]: "bg-green-100 text-green-800",
  };

  return colors[role] || "bg-gray-100 text-gray-800";
}

// Função auxiliar para destacar o termo pesquisado
function highlightSearchTerm(text: string, searchTerm: string) {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 px-1 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}