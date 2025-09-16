import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = authClient;

// Função para login social com Google
export const signInWithGoogle = async () => {
  try {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account", // Redireciona para dashboard após login
    });
    return data;
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
};
