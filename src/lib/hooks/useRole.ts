"use client";

import { useState, useEffect } from "react";
import {
  UserRole,
  hasRole,
  hasAnyRole,
  isAdmin,
  isMedico,
  isPaciente,
} from "@/lib/utils/roles";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UseRoleReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  hasRole: (requiredRole: UserRole) => boolean;
  hasAnyRole: (allowedRoles: UserRole[]) => boolean;
  isAdmin: () => boolean;
  isMedico: () => boolean;
  isPaciente: () => boolean;
  refetch: () => Promise<void>;
}

export function useRole(): UseRoleReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/profile");

      if (!response.ok) {
        if (response.status === 401) {
          setUser(null);
          return;
        }
        throw new Error("Erro ao carregar perfil do usuário");
      }

      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const checkRole = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    return hasRole(user.role, requiredRole);
  };

  const checkAnyRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return hasAnyRole(user.role, allowedRoles);
  };

  const checkIsAdmin = (): boolean => {
    if (!user) return false;
    return isAdmin(user.role);
  };

  const checkIsMedico = (): boolean => {
    if (!user) return false;
    return isMedico(user.role);
  };

  const checkIsPaciente = (): boolean => {
    if (!user) return false;
    return isPaciente(user.role);
  };

  return {
    user,
    loading,
    error,
    hasRole: checkRole,
    hasAnyRole: checkAnyRole,
    isAdmin: checkIsAdmin,
    isMedico: checkIsMedico,
    isPaciente: checkIsPaciente,
    refetch: fetchUserProfile,
  };
}
