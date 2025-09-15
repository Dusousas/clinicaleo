import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRole, hasAnyRole } from "@/lib/utils/roles";

/**
 * Middleware para verificar se o usuário tem permissão para acessar uma rota
 * @param requiredRoles - Roles necessários para acessar a rota
 * @returns Função middleware
 */
export function withRoleAuth(requiredRoles: UserRole[]) {
  return async function (request: NextRequest) {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) {
        return NextResponse.json(
          { error: "Usuário não autenticado" },
          { status: 401 }
        );
      }

      // Buscar o usuário para obter o role
      const { PrismaClient } = await import("@/generated/prisma");
      const prisma = new PrismaClient();

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 }
        );
      }

      const userRole = user.role as UserRole;

      if (!hasAnyRole(userRole, requiredRoles)) {
        return NextResponse.json(
          { error: "Acesso negado. Permissões insuficientes." },
          { status: 403 }
        );
      }

      // Adicionar informações do usuário ao request para uso posterior
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", session.user.id);
      requestHeaders.set("x-user-role", userRole);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Erro na verificação de roles:", error);
      return NextResponse.json(
        { error: "Erro interno do servidor" },
        { status: 500 }
      );
    }
  };
}
