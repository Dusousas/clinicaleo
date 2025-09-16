"use client";

import { RoleGuard } from "@/components/RoleGuard";
import { UserRole } from "@/lib/utils/roles";

interface ProtectedQuizProps {
  children: React.ReactNode;
}

export default function ProtectedQuiz({ children }: ProtectedQuizProps) {
  return (
    <RoleGuard
      allowedRoles={[UserRole.PACIENTE, UserRole.ADMIN]}
      fallback={
        <section className="h-[calc(100vh-72px)] flex items-center justify-center w-full">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-Quicksand uppercase font-semibold text-[#09243C] mb-4">
              Acesso Restrito
            </h2>
            <p className="text-[#09243C] mb-6">
              Apenas pacientes podem realizar o questionário.
            </p>
            <a
              href="/account"
              className="bg-[#09243C] text-white px-6 py-2 rounded-lg hover:bg-[#0a2a40] transition-colors"
            >
              Voltar ao Dashboard
            </a>
          </div>
        </section>
      }
    >
      {children}
    </RoleGuard>
  );
}
