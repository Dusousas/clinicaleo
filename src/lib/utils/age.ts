/**
 * Calcula a idade com base na data de nascimento
 * @param birthDate - Data de nascimento
 * @returns Idade em anos
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Calcula a idade precisa considerando mês e dia
  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;

  return actualAge;
}

/**
 * Verifica se a pessoa tem pelo menos a idade mínima
 * @param birthDate - Data de nascimento
 * @param minAge - Idade mínima (padrão: 18)
 * @returns true se a pessoa tem a idade mínima ou mais
 */
export function isMinimumAge(birthDate: Date, minAge: number = 18): boolean {
  return calculateAge(birthDate) >= minAge;
}

/**
 * Obtém a data máxima permitida para uma idade mínima
 * @param minAge - Idade mínima (padrão: 18)
 * @returns Data máxima no formato YYYY-MM-DD
 */
export function getMaxDateForAge(minAge: number = 18): string {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );
  return maxDate.toISOString().split("T")[0];
}
