"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineGoogle,
} from "react-icons/ai";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Eye = AiOutlineEye;
const EyeOff = AiOutlineEyeInvisible;

// Schema de validação
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres." })
    .max(50),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Login realizado com sucesso!");
            router.push("/account");
          },
          onError: (error) => {
            toast.error("Email ou senha inválidos.");
            console.error("Erro no login:", error);
          },
        }
      );
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
      console.error("Erro no login:", error);
    }
  }

  const handleGoogleLogin = () => {
    toast.info("Login com Google em desenvolvimento...");
    // TODO: Implementar Google OAuth
  };

  return (
    <section className="py-20">
      <div className="maxW h-full flex justify-center items-center flex-col">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="bg-Azul px-8 py-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Bem-vindo de volta!
            </h3>
            <p className="text-blue-100 text-sm">Faça login para continuar</p>
          </div>

          <div className="p-8">
            <Button
              onClick={handleGoogleLogin}
              disabled={form.formState.isSubmitting}
              variant="outline"
              className="w-full mb-6 flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group lg:h-auto"
            >
              <AiOutlineGoogle className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">
                {form.formState.isSubmitting
                  ? "Conectando..."
                  : "Continuar com Google"}
              </span>
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-white px-3">ou</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              placeholder="seu@email.com"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Senha
                        </label>
                        <div className="relative">
                          <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              placeholder="••••••••"
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />
                    <Label
                      htmlFor="remember-me"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Lembrar de mim
                    </Label>
                  </div>
                  <Link
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    href={"/forgot-password"}
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full mt-6 bg-Azul cursor-pointer text-white py-3 px-4 rounded-xl font-medium focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] h-auto"
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Entrando...
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Não tem uma conta?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Ao continuar, você concorda com nossos</p>
          <div className="flex justify-center gap-4 mt-1">
            <button className="hover:text-blue-600 transition-colors">
              Termos de Uso
            </button>
            <span>•</span>
            <button className="hover:text-blue-600 transition-colors">
              Política de Privacidade
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
