"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deactivateAccountSchema } from "@/lib/validations/schemas";

type DeactivateFormData = z.infer<typeof deactivateAccountSchema>;

export default function DeactivateAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<DeactivateFormData>({
    resolver: zodResolver(deactivateAccountSchema),
    defaultValues: {
      reason: "",
      password: "",
      confirmDeactivation: false,
    },
  });

  const deactivationReasons = [
    "Não uso mais o serviço",
    "Preocupações com privacidade",
    "Encontrei uma alternativa melhor",
    "Problemas técnicos",
    "Atendimento ao cliente insatisfatório",
    "Muito caro",
    "Outros",
  ];

  const onSubmit = async (values: DeactivateFormData) => {
    try {
      // Aqui você faria a chamada para a API com os valores do formulário
      // const response = await deactivateAccount(values);
      console.log("Formulário enviado:", values);

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Conta desativada com sucesso. Sentiremos sua falta!");
      // Redirecionar para página de login ou home
      router.push("/");
    } catch (error) {
      console.error("Erro ao desativar conta:", error);
      toast.error(
        "Erro ao desativar conta. Verifique sua senha e tente novamente."
      );
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="bg-Bg1 lg:pt-50 lg:pb-20">
      <div className="maxW">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-textPrimary mb-2">
              Desativar Conta
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Esta ação é <strong>irreversível</strong>. Todos os seus dados
              <br />
              serão permanentemente removidos.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Motivo da desativação */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo da desativação *
                    </label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                          <SelectValue placeholder="Selecione um motivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deactivationReasons.map((reasonOption, index) => (
                          <SelectItem key={index} value={reasonOption}>
                            {reasonOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmação de senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirme sua senha *
                    </label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha para confirmar"
                          className="w-full px-4 py-3 pr-10 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox de confirmação */}
              <FormField
                control={form.control}
                name="confirmDeactivation"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <div className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu entendo que esta ação é <strong>permanente</strong> e
                        que todos os meus dados, configurações e histórico serão{" "}
                        <strong>completamente removidos</strong>e não poderão
                        ser recuperados.
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Aviso adicional */}
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">
                    <strong>Atenção:</strong> Após a desativação, você terá 30
                    dias para reativar sua conta antes que os dados sejam
                    permanentemente excluídos.
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={`w-full font-medium py-3 px-4 rounded-md transition duration-200 ${
                    form.formState.isSubmitting
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  }`}
                >
                  {form.formState.isSubmitting
                    ? "Desativando..."
                    : "Desativar Conta"}
                </Button>

                <Button
                  type="button"
                  onClick={handleCancel}
                  disabled={form.formState.isSubmitting}
                  variant="secondary"
                  className={`w-full font-medium py-3 px-4 rounded-md transition duration-200 ${
                    form.formState.isSubmitting
                      ? "bg-gray-200 cursor-not-allowed text-gray-400"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                  }`}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
