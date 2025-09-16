"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProductSchema } from "@/lib/validations/schemas";
import CuponsProdutos from "./CuponsProdutos";
import RelatorioProdutos from "./RelatorioProdutos";

type AddProductFormData = z.infer<typeof addProductSchema>;

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  ativo: boolean;
  descricao?: string;
  estoque?: number;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cupom {
  id: string;
  codigo: string;
  desconto: number;
  tipo: "PERCENTUAL" | "FIXO";
  dataExpiracao: string;
  ativo: boolean;
  usoMaximo: number;
  usosAtuais: number;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Produtos() {
  const [activeTab, setActiveTab] = useState<
    "produtos" | "cupons" | "relatorios"
  >("produtos");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form para adicionar produto
  const form = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      estoque: "",
      observacoes: "",
    },
  });

  // Carregar produtos do banco
  const carregarProdutos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/produtos");
      if (response.ok) {
        const data = await response.json();
        setProdutos(data.produtos || []);
      } else {
        toast.error("Erro ao carregar produtos");
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar cupons do banco
  const carregarCupons = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/cupons");
      if (response.ok) {
        const data = await response.json();
        setCupons(data.cupons || []);
      } else {
        toast.error("Erro ao carregar cupons");
      }
    } catch (error) {
      console.error("Erro ao carregar cupons:", error);
      toast.error("Erro ao conectar com o servidor");
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
    carregarCupons();
  }, [carregarProdutos, carregarCupons]);

  // Adicionar produto
  const onSubmitAddProduct = async (values: AddProductFormData) => {
    try {
      const response = await fetch("/api/admin/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Produto adicionado com sucesso!");
        form.reset();
        setShowAddForm(false);
        await carregarProdutos();
      } else {
        toast.error("Erro ao adicionar produto");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao conectar com o servidor");
    }
  };

  const updateProductPrice = async (id: string, novoPreco: number) => {
    try {
      setIsUpdating(true);
      const response = await fetch("/api/admin/produtos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, preco: novoPreco }),
      });

      if (response.ok) {
        toast.success("Preço atualizado com sucesso!");
        await carregarProdutos();
      } else {
        toast.error("Erro ao atualizar preço");
      }
    } catch (error) {
      console.error("Erro ao atualizar preço:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsUpdating(false);
      setEditingProduct(null);
    }
  };

  const toggleProductStatus = async (id: string) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    try {
      setIsUpdating(true);
      const response = await fetch("/api/admin/produtos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ativo: !produto.ativo }),
      });

      if (response.ok) {
        toast.success(
          `Produto ${!produto.ativo ? "ativado" : "desativado"} com sucesso!`
        );
        await carregarProdutos();
      } else {
        toast.error("Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="maxW py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciamento de Produtos
          </h1>
          <p className="text-gray-600">
            Gerencie preços, cupons de desconto e relatórios de vendas
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "produtos", label: "Produtos & Preços", icon: "🛍️" },
                { key: "cupons", label: "Cupons de Desconto", icon: "🎟️" },
                { key: "relatorios", label: "Relatórios", icon: "📊" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(
                      tab.key as "produtos" | "cupons" | "relatorios"
                    )
                  }
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Produtos Tab */}
        {activeTab === "produtos" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Botão Adicionar Produto */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Produtos Médicos
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  Gerencie medicamentos e tratamentos
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Adicionar Produto
              </button>
            </div>

            {/* Formulário de Adicionar Produto */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Adicionar Novo Produto
                </h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitAddProduct)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nome *
                            </label>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ex: Finasterida 1mg"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categoria"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Categoria *
                            </label>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Medicamentos">
                                  Medicamentos
                                </SelectItem>
                                <SelectItem value="Tratamentos">
                                  Tratamentos
                                </SelectItem>
                                <SelectItem value="Consultas">
                                  Consultas
                                </SelectItem>
                                <SelectItem value="Exames">Exames</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preco"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preço *
                            </label>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="estoque"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Estoque
                            </label>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="0"
                                placeholder="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Descrição
                            </label>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={3}
                                placeholder="Descrição do produto..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        variant="outline"
                        disabled={form.formState.isSubmitting}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {form.formState.isSubmitting
                          ? "Adicionando..."
                          : "Adicionar Produto"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Produtos Cadastrados
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  Gerencie preços e status dos seus produtos
                </p>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Carregando produtos...
                  </h3>
                  <p className="text-gray-500">
                    Aguarde enquanto buscamos os dados.
                  </p>
                </div>
              ) : produtos.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    🛍️
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum produto cadastrado
                  </h3>
                  <p className="text-gray-500">
                    Comece adicionando seu primeiro produto.
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Adicionar Primeiro Produto
                  </button>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="block md:hidden">
                    <div className="divide-y divide-gray-200">
                      {produtos.map((produto) => (
                        <div key={produto.id} className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {produto.nome}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {produto.descricao}
                              </p>
                              <span className="inline-flex mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {produto.categoria}
                              </span>
                            </div>
                            <label className="inline-flex items-center ml-3">
                              <input
                                type="checkbox"
                                checked={produto.ativo}
                                onChange={() => toggleProductStatus(produto.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span
                                className={`ml-2 text-xs ${
                                  produto.ativo
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {produto.ativo ? "Ativo" : "Inativo"}
                              </span>
                            </label>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            {editingProduct === produto.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  defaultValue={produto.preco}
                                  step="0.01"
                                  min="0"
                                  className="w-24 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const newPrice = parseFloat(
                                        (e.target as HTMLInputElement).value
                                      );
                                      if (newPrice > 0) {
                                        updateProductPrice(
                                          produto.id,
                                          newPrice
                                        );
                                      }
                                    } else if (e.key === "Escape") {
                                      setEditingProduct(null);
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    if (newPrice > 0) {
                                      updateProductPrice(produto.id, newPrice);
                                    } else {
                                      setEditingProduct(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold text-gray-900">
                                  {formatCurrency(produto.preco)}
                                </span>
                                <button
                                  onClick={() => setEditingProduct(produto.id)}
                                  className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                  title="Editar preço"
                                >
                                  ✏️
                                </button>
                              </div>
                            )}
                            <button className="text-blue-600 hover:text-blue-900 text-xs font-medium">
                              Ver Detalhes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Produto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoria
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Preço Atual
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {produtos.map((produto) => (
                          <tr key={produto.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {produto.nome}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {produto.descricao}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {produto.categoria}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {editingProduct === produto.id ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    defaultValue={produto.preco}
                                    step="0.01"
                                    min="0"
                                    className="w-24 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        const newPrice = parseFloat(
                                          (e.target as HTMLInputElement).value
                                        );
                                        if (newPrice > 0) {
                                          updateProductPrice(
                                            produto.id,
                                            newPrice
                                          );
                                        }
                                      } else if (e.key === "Escape") {
                                        setEditingProduct(null);
                                      }
                                    }}
                                    onBlur={(e) => {
                                      const newPrice = parseFloat(
                                        e.target.value
                                      );
                                      if (newPrice > 0) {
                                        updateProductPrice(
                                          produto.id,
                                          newPrice
                                        );
                                      } else {
                                        setEditingProduct(null);
                                      }
                                    }}
                                    autoFocus
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-semibold text-gray-900">
                                    {formatCurrency(produto.preco)}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setEditingProduct(produto.id)
                                    }
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Editar preço"
                                  >
                                    ✏️
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  checked={produto.ativo}
                                  onChange={() =>
                                    toggleProductStatus(produto.id)
                                  }
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span
                                  className={`ml-2 text-sm ${
                                    produto.ativo
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {produto.ativo ? "Ativo" : "Inativo"}
                                </span>
                              </label>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                                Ver Detalhes
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Cupons Tab */}
        {activeTab === "cupons" && (
          <CuponsProdutos cupons={cupons} setCupons={setCupons} />
        )}

        {/* Relatórios Tab */}
        {activeTab === "relatorios" && (
          <RelatorioProdutos
            produtos={produtos}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
    </section>
  );
}
