"use client";

import { useRole } from "@/lib/hooks/useRole";
import { UserRole } from "@/lib/utils/roles";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback = <AccessDenied />,
  loadingComponent = <Loading />,
}: RoleGuardProps) {
  const { user, loading, hasAnyRole } = useRole();

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!user) {
    return <NotAuthenticated />;
  }

  if (!hasAnyRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}

function NotAuthenticated() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você precisa estar logado para acessar esta página.
        </p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Fazer Login
        </a>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página.
        </p>
        <a
          href="/account"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
}
