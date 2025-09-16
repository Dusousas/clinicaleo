"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isMinimumAge, getMaxDateForAge } from "@/lib/utils/age";

// Schema de validação expandido
const registerSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
    .max(50),
  sobrenome: z
    .string()
    .trim()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres." })
    .max(50),
  email: z.string().email({ message: "Email inválido." }),
  dataNascimento: z
    .string()
    .min(1, { message: "Data de nascimento é obrigatória." })
    .refine(
      (date) => {
        const birthDate = new Date(date);
        return isMinimumAge(birthDate, 18);
      },
      { message: "Você deve ter pelo menos 18 anos para se cadastrar." }
    ),
  whatsapp: z
    .string()
    .min(10, { message: "WhatsApp deve ter pelo menos 10 dígitos." }),
  senha: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres." })
    .max(50),
  termos: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições.",
  }),
  privacidade: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar a política de privacidade.",
  }),
  ofertas: z.boolean().optional(),
});

export default function Page() {
  const router = useRouter();

  // Calcula a data máxima permitida (18 anos atrás)
  const maxDateString = getMaxDateForAge(18);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      dataNascimento: "",
      whatsapp: "",
      senha: "",
      termos: false,
      privacidade: false,
      ofertas: false,
    },
  });

  // Função para lidar com o signup do Google
  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Erro no signup com Google:", error);
      toast.error("Erro ao fazer cadastro com Google. Tente novamente.");
    }
  };

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      // Combinar nome e sobrenome para o campo name da autenticação
      const fullName = `${values.nome} ${values.sobrenome}`.trim();

      await authClient.signUp.email(
        {
          email: values.email,
          password: values.senha,
          name: fullName,
        },
        {
          onSuccess: async () => {
            try {
              // Após o registro bem-sucedido, salvar as informações adicionais
              const response = await fetch("/api/user/update", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  dateOfBirth: values.dataNascimento,
                  whatsapp: values.whatsapp,
                  acceptsOffers: values.ofertas,
                }),
              });

              if (response.ok) {
                toast.success("Conta criada com sucesso!");
                router.push("/account");
              } else {
                toast.warning(
                  "Conta criada, mas algumas informações não foram salvas."
                );
                router.push("/account");
              }
            } catch (error) {
              console.error("Erro ao salvar informações adicionais:", error);
              toast.warning(
                "Conta criada, mas algumas informações não foram salvas."
              );
              router.push("/account");
            }
          },
          onError: (ctx) => {
            if (ctx.error.code === "USER_ALREADY_EXISTS") {
              toast.error("Email já cadastrado.");
            } else {
              toast.error("Erro ao criar conta. Tente novamente.");
            }
          },
        }
      );
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
      console.error("Erro no registro:", error);
    }
  }

  return (
    <>
      <section className="h-[calc(100vh-72px)] bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Primeira vez aqui?
            </h1>
            <p className="text-gray-600 text-sm">
              Crie seu login e saiba o melhor tratamento para sua queda capilar.
            </p>
          </div>

          {/* Botão Google OAuth */}
          <div className="mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full py-3 flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 transition-colors"
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </Button>
          </div>

          {/* Separador */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Ou</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Nome e Sobrenome */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sobrenome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Sobrenome"
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Todo contato com o médico será feito através do email.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data de Nascimento */}
              <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Data de nascimento"
                        max={maxDateString}
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Você deve ter pelo menos 18 anos para se cadastrar.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* WhatsApp */}
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Whatsapp"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      O nosso time de suporte poderá entrar em contato pelo
                      Whatsapp
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha */}
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Senha"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkboxes */}
              <div className="space-y-3 mt-6">
                <FormField
                  control={form.control}
                  name="termos"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </FormControl>
                        <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                          Eu concordo com os{" "}
                          <span className="text-red-400 underline cursor-pointer hover:text-red-500">
                            Termos & Condições
                          </span>{" "}
                          e{" "}
                          <span className="text-red-400 underline cursor-pointer hover:text-red-500">
                            Política de Privacidade
                          </span>
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacidade"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </FormControl>
                        <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                          Eu concordo com a coleta e tratamento dos meus dados
                          conforme{" "}
                          <span className="text-red-400 underline cursor-pointer hover:text-red-500">
                            Política de Proteção de Dados
                          </span>
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ofertas"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </FormControl>
                        <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                          Tenha acesso{" "}
                          <span className="text-blue-600 font-medium">
                            exclusivo
                          </span>{" "}
                          a brindes, descontos e ofertas especiais
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Botão Continuar */}
              <Button
                type="submit"
                className="w-full bg-gray-300 text-gray-600 py-4 rounded-md font-bold text-sm tracking-wide mt-8 hover:bg-gray-400 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  form.formState.isSubmitting ||
                  !form.watch("termos") ||
                  !form.watch("privacidade")
                }
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "CONTINUAR"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
