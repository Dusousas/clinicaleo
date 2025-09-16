"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, MapPin, Camera, ArrowLeft } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editProfileSchema } from "@/lib/validations/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfilePage() {
  const { data: session, isPending } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      dateOfBirth: "",
      cpf: "",
      address: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
      neighborhood: "",
      acceptsPromotions: false,
    },
  });

  // Carregar dados do usuário do banco
  useEffect(() => {
    const loadUserData = async () => {
      if (!session?.user) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          const user = data.user;

          // Formatação da data de nascimento para o formato DD/MM/AAAA
          let formattedDateOfBirth = "";
          if (user.dateOfBirth) {
            const date = new Date(user.dateOfBirth);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            formattedDateOfBirth = `${day}/${month}/${year}`;
          }

          form.reset({
            name: user.name || "",
            email: user.email || "",
            whatsapp: user.whatsapp || "",
            dateOfBirth: formattedDateOfBirth,
            cpf: user.cpf || "",
            address: user.address || "",
            number: user.number || "",
            complement: user.complement || "",
            city: user.city || "",
            state: user.state || "",
            zipCode: user.zipCode || "",
            neighborhood: user.neighborhood || "",
            acceptsPromotions: user.acceptsPromotions || false,
          });

          if (user.image) {
            setProfileImage(user.image);
          }
        } else {
          toast.error("Erro ao carregar dados do perfil");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil");
      }
    };

    if (!isPending) {
      loadUserData();
    }
  }, [session, isPending, router, form]);

  const formatCEP = (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, "");
    return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  // Format functions
  const formatCPF = (cpf: string) => {
    const clean = cpf.replace(/\D/g, "");
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhoneNumber = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length <= 10) {
      return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  // CEP search function
  const handleCEPSearch = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, "");
    if (cleanCEP.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCEP}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          form.setValue("city", data.localidade);
          form.setValue("state", data.uf);
          form.setValue("neighborhood", data.bairro);
          form.setValue("address", data.logradouro);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  // Image upload handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem válido');
      return;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      // Importar e usar a função de processamento de imagem
      const { processImageFile } = await import('@/lib/utils/imageUtils');
      const processedImage = await processImageFile(file);
      setProfileImage(processedImage);
      toast.success('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      toast.error('Erro ao processar a imagem');
    }
  };

  // Navigation handlers
  const handleBack = () => {
    router.push("/account");
  };

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: EditProfileFormData) => {
    setIsLoading(true);

    try {
      // Converter data de nascimento para formato ISO se preenchida
      let dateOfBirth = null;
      if (data.dateOfBirth) {
        const [day, month, year] = data.dateOfBirth.split("/");
        dateOfBirth = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        ).toISOString();
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dateOfBirth,
          image: profileImage,
        }),
      });

      if (response.ok) {
        toast.success("Perfil atualizado com sucesso!");
        router.push("/account");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro interno do servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-Bg1 pt-40">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Editar Perfil
                </h2>
                <p className="text-gray-700 text-sm mt-1">
                  Mantenha suas informações atualizadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Profile Image Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/20">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white/60" />
                  )}
                </div>
                <label className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 rounded-full p-3 cursor-pointer shadow-lg transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">
                {form.watch("name") || "Usuário"}
              </h2>
              <p className="text-white/70 text-sm">
                Clique na foto para alterar
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Personal Information Section */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Informações Pessoais
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nome Completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite seu nome completo"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Data de Nascimento
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="DD/MM/AAAA"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            CPF
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite seu CPF"
                              maxLength={14}
                              onChange={(e) => {
                                const formatted = formatCPF(e.target.value);
                                field.onChange(formatted);
                              }}
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Mail className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Informações de Contato
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              readOnly
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500 mt-1">
                            Para alterar o e-mail, entre em contato com nosso
                            suporte
                          </p>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            WhatsApp
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Digite seu WhatsApp"
                              maxLength={15}
                              onChange={(e) => {
                                const formatted = formatPhoneNumber(
                                  e.target.value
                                );
                                field.onChange(formatted);
                              }}
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <MapPin className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Endereço
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            CEP
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite seu CEP"
                              maxLength={9}
                              onChange={(e) => {
                                const formatted = formatCEP(e.target.value);
                                field.onChange(formatted);
                                handleCEPSearch(formatted);
                              }}
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Cidade
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite sua cidade"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Estado
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite seu estado"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Bairro
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite seu bairro"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Endereço
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Digite seu endereço completo"
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Número
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Número"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Complemento
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Complemento (opcional)"
                              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Email Preferences Section */}
                <div className="pb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preferências de Comunicação
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="acceptsPromotions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-5 h-5 text-slate-600 border-gray-300 rounded"
                            />
                          </FormControl>
                          <FormLabel className="text-gray-700 cursor-pointer font-normal">
                            Aceito receber ofertas e promoções por e-mail e
                            WhatsApp
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col-reverse sm:flex-row justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleBack}
                disabled={isLoading}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  isLoading
                    ? "bg-gray-200 cursor-not-allowed text-gray-400"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Salvando...</span>
                  </div>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
