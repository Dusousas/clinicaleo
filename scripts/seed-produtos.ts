import { PrismaClient, TipoCupom } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Criando produtos de exemplo...");

  // Produtos médicos
  const produtos = [
    {
      nome: "Finasterida 1mg - 30 comprimidos",
      descricao: "Medicamento para tratamento da calvície masculina",
      preco: 89.9,
      categoria: "Medicamentos",
      estoque: 50,
      observacoes: "Prescrição médica obrigatória",
    },
    {
      nome: "Minoxidil 5% - Solução tópica",
      descricao: "Tratamento tópico para crescimento capilar",
      preco: 79.9,
      categoria: "Medicamentos",
      estoque: 30,
      observacoes: "Aplicar duas vezes ao dia",
    },
    {
      nome: "Consulta Dermatológica",
      descricao: "Consulta especializada em dermatologia",
      preco: 250.0,
      categoria: "Consultas",
      estoque: 0,
      observacoes: "Agendamento prévio necessário",
    },
    {
      nome: "Dutasterida 0.5mg - 30 cápsulas",
      descricao: "Medicamento para tratamento da hiperplasia prostática",
      preco: 120.0,
      categoria: "Medicamentos",
      estoque: 25,
      observacoes: "Prescrição médica obrigatória",
    },
    {
      nome: "Tricoscopia Digital",
      descricao: "Exame para análise detalhada do couro cabeludo",
      preco: 180.0,
      categoria: "Exames",
      estoque: 0,
      observacoes: "Resultado em 24 horas",
    },
  ];

  for (const produto of produtos) {
    await prisma.produto.create({
      data: produto,
    });
  }

  console.log("✅ Produtos criados com sucesso!");

  console.log("🎟️ Criando cupons de exemplo...");

  // Cupons de desconto
  const cupons = [
    {
      codigo: "BEMVINDO20",
      desconto: 20,
      tipo: TipoCupom.PERCENTUAL,
      dataExpiracao: new Date("2025-12-31"),
      usoMaximo: 100,
      observacoes: "Válido para novos pacientes",
    },
    {
      codigo: "DESCONTO50",
      desconto: 50,
      tipo: TipoCupom.FIXO,
      dataExpiracao: new Date("2025-10-31"),
      usoMaximo: 50,
      observacoes: "Desconto fixo em reais",
    },
    {
      codigo: "CONSULTA15",
      desconto: 15,
      tipo: TipoCupom.PERCENTUAL,
      dataExpiracao: new Date("2025-11-30"),
      usoMaximo: 200,
      observacoes: "Válido apenas para consultas",
    },
  ];

  for (const cupom of cupons) {
    await prisma.cupom.create({
      data: cupom,
    });
  }

  console.log("✅ Cupons criados com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
