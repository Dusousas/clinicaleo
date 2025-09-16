"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

interface UserProfile {
  name: string;
  email: string;
  whatsapp?: string;
  dateOfBirth?: string;
  cpf?: string;
  address?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: string;
  image?: string;
}

const ContaPage = () => {
  const { data: session, isPending } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do usuário
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
        } else {
          toast.error("Erro ao carregar dados do perfil");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPending) {
      loadUserProfile();
    }
  }, [session, isPending]);

  // Função para formatar data de criação da conta
  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  // Função para obter iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isPending || isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-24 mb-6"></div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="bg-gray-200 rounded-full w-16 h-16 mr-4"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Conta</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500">
            Erro ao carregar informações do perfil
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Conta</h2>

      {/* Informações do usuário */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-teal-100 rounded-full p-2 mr-4 flex items-center justify-center w-20 h-20">
            {userProfile.image ? (
              <Image
                src={userProfile.image}
                alt="Profile"
                width={72}
                height={72}
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-teal-600 font-semibold text-lg">
                  {getInitials(userProfile.name)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              {userProfile.name}
            </h3>
            <p className="text-gray-700">
              Membro desde {formatMemberSince(userProfile.createdAt)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-700">{userProfile.email}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="font-medium text-gray-700">
                {userProfile.whatsapp || "Não informado"}
              </p>
            </div>
          </div>

          {/* Mostrar endereço se disponível */}
          {(userProfile.address || userProfile.city) && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg md:col-span-2">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-medium text-gray-700">
                  {[
                    userProfile.address,
                    userProfile.number,
                    userProfile.complement,
                    userProfile.city,
                    userProfile.state,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Não informado"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configurações da conta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Configurações Pessoais</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Informações Pessoais</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Documentos do tratamento</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Assinatura e Pagamento</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Métodos de Pagamento</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Histórico de Pedidos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Ações da conta */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Ações da Conta</h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="/account/edit-profile"
            className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Editar Perfil
          </a>

          <a
            href="/account/forgot-password"
            className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Alterar Senha
          </a>

          <a
            href="/account/disable"
            className="px-4 py-2 cursor-pointer border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Desativar Conta
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContaPage;
