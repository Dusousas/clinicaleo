"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "@/lib/validations/schemas";

export default function PasswordResetPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      // Aqui você integraria com a API de recuperação de senha
      // const response = await fetch('/api/forgot-password', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(values),
      // });

      toast.success(`Instruções enviadas para ${values.email}!`);
      // router.push('/login');
    } catch (error) {
      toast.error("Erro ao enviar e-mail. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <section className="h-[calc(100vh-72px)] bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full maxW">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto lg:mt-25">
          <h3 className="text-2xl font-bold text-textPrimary text-center mb-2">
            Quer redefinir sua senha?
          </h3>
          <p className="text-gray-600 text-center mb-8 text-sm leading-relaxed">
            Não se preocupe. Enviaremos por e-mail as
            <br />
            instruções para redefinir sua senha
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        className="w-full px-4 py-3 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-md transition duration-200 mb-6"
              >
                {form.formState.isSubmitting
                  ? "Enviando..."
                  : "Redefinir senha"}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <button
              onClick={handleBackToLogin}
              className="text-blue-600 hover:text-textPrimary text-sm font-medium border-none uppercase bg-transparent cursor-pointer"
            >
              Voltar para login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
