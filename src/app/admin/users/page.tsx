"use client";

import { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { UserRole, getRoleName } from "@/lib/utils/roles";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Usuários</h1>
        <p className="text-gray-600 mt-2">
          Visualize e gerencie os roles dos usuários do sistema.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Lista de Usuários ({users.length})
          </h2>
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
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

        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>
    </div>
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
