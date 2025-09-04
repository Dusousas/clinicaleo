/**
 * Enum dos roles de usuário
 */
export enum UserRole {
  ADMIN = "ADMIN",
  MEDICO = "MEDICO",
  PACIENTE = "PACIENTE",
}

/**
 * Verifica se o usuário tem um role específico
 * @param userRole - Role do usuário
 * @param requiredRole - Role necessário
 * @returns true se o usuário tem o role necessário
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return userRole === requiredRole;
}

/**
 * Verifica se o usuário tem pelo menos um dos roles especificados
 * @param userRole - Role do usuário
 * @param allowedRoles - Roles permitidos
 * @returns true se o usuário tem pelo menos um dos roles permitidos
 */
export function hasAnyRole(
  userRole: UserRole,
  allowedRoles: UserRole[]
): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Verifica se o usuário é admin
 * @param userRole - Role do usuário
 * @returns true se o usuário é admin
 */
export function isAdmin(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN;
}

/**
 * Verifica se o usuário é médico
 * @param userRole - Role do usuário
 * @returns true se o usuário é médico
 */
export function isMedico(userRole: UserRole): boolean {
  return userRole === UserRole.MEDICO;
}

/**
 * Verifica se o usuário é paciente
 * @param userRole - Role do usuário
 * @returns true se o usuário é paciente
 */
export function isPaciente(userRole: UserRole): boolean {
  return userRole === UserRole.PACIENTE;
}

/**
 * Obtém o nome amigável do role
 * @param role - Role do usuário
 * @returns Nome amigável do role
 */
export function getRoleName(role: UserRole): string {
  const roleNames = {
    [UserRole.ADMIN]: "Administrador",
    [UserRole.MEDICO]: "Médico",
    [UserRole.PACIENTE]: "Paciente",
  };

  return roleNames[role] || "Desconhecido";
}

/**
 * Obtém as permissões básicas para cada role
 * @param role - Role do usuário
 * @returns Array de permissões
 */
export function getRolePermissions(role: UserRole): string[] {
  const permissions = {
    [UserRole.ADMIN]: [
      "manage_users",
      "manage_doctors",
      "view_all_data",
      "manage_system",
    ],
    [UserRole.MEDICO]: [
      "view_patients",
      "manage_consultations",
      "view_quiz_results",
      "create_prescriptions",
    ],
    [UserRole.PACIENTE]: [
      "take_quiz",
      "view_own_results",
      "book_consultations",
      "view_own_profile",
    ],
  };

  return permissions[role] || [];
}
