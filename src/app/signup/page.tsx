"use client";

import React from "react";
import Link from "next/link";
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
import { authClient } from "@/lib/auth-client";
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
    .refine((date) => {
      const birthDate = new Date(date);
      return isMinimumAge(birthDate, 18);
    }, { message: "Você deve ter pelo menos 18 anos para se cadastrar." }),
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
                router.push("/dashboard");
              } else {
                toast.warning(
                  "Conta criada, mas algumas informações não foram salvas."
                );
                router.push("/dashboard");
              }
            } catch (error) {
              console.error("Erro ao salvar informações adicionais:", error);
              toast.warning(
                "Conta criada, mas algumas informações não foram salvas."
              );
              router.push("/dashboard");
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
                    <p className='text-xs text-gray-500 mt-1'>
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
                          <Link 
                            href="/termos"
                            className="text-red-400 underline cursor-pointer hover:text-red-500"
                          >
                            Termos & Condições
                          </Link>{" "}
                          e{" "}
                          <Link 
                            href="/politica-privacidade"
                            className="text-red-400 underline cursor-pointer hover:text-red-500"
                          >
                            Política de Privacidade
                          </Link>
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
                          <Link 
                            href="/politica-privacidade"
                            className="text-red-400 underline cursor-pointer hover:text-red-500"
                          >
                            Política de Proteção de Dados
                          </Link>
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