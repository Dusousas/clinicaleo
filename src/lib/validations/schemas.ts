import { z } from "zod";

// Schemas base reutilizáveis
export const emailSchema = z.string().email({ message: "Email inválido." });

export const passwordSchema = z
  .string()
  .min(8, { message: "Senha deve ter pelo menos 8 caracteres." })
  .max(50, { message: "Senha deve ter no máximo 50 caracteres." });

export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
  .max(50, { message: "Nome deve ter no máximo 50 caracteres." });

export const cpfSchema = z
  .string()
  .min(1, { message: "CPF é obrigatório." })
  .refine(
    (val) => {
      // Remover pontos e traços
      const cpf = val.replace(/\D/g, "");
      return cpf.length === 11;
    },
    { message: "CPF deve conter 11 dígitos." }
  );

export const cepSchema = z
  .string()
  .min(1, { message: "CEP é obrigatório." })
  .refine(
    (val) => {
      // Aceitar formato 00000-000 ou 00000000
      const cep = val.replace(/\D/g, "");
      return cep.length === 8;
    },
    { message: "CEP deve conter 8 dígitos." }
  );

export const phoneSchema = z
  .string()
  .min(10, { message: "Telefone deve ter pelo menos 10 dígitos." })
  .max(15, { message: "Telefone deve ter no máximo 15 dígitos." });

// Schema para forgot password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Schema para change password
export const changePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, { message: "Confirme a senha." }),
});

// Schema para questionário dinâmico
export const quizAnswerSchema = z.object({
  questionId: z.string().min(1, { message: "ID da pergunta é obrigatório." }),
  answer: z.string().min(1, { message: "Resposta é obrigatória." }),
});

export const quizSubmissionSchema = z.object({
  answers: z
    .array(quizAnswerSchema)
    .min(1, { message: "Pelo menos uma resposta é obrigatória." }),
  quizType: z.string().default("medical_evaluation"),
});

// Schema para respostas de texto livre
export const freeTextAnswerSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Resposta é obrigatória." })
    .min(5, { message: "Resposta deve ter pelo menos 5 caracteres." })
    .max(1000, { message: "Resposta deve ter no máximo 1000 caracteres." }),
});

// Schema para respostas de múltipla escolha
export const multipleChoiceAnswerSchema = z.object({
  answer: z.string().min(1, { message: "Selecione uma opção." }),
});

// Schema para validação de pergunta individual do quiz
export const quizQuestionValidationSchema = z
  .object({
    questionId: z.string(),
    questionType: z.enum(["text", "multiple_choice", "textarea"]),
    isRequired: z.boolean(),
    answer: z.string().optional(),
    options: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.isRequired) {
        return data.answer && data.answer.trim().length > 0;
      }
      return true;
    },
    {
      message: "Esta pergunta é obrigatória.",
      path: ["answer"],
    }
  );

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Token é obrigatório." }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Confirme a senha." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Schema para checkout
export const checkoutSchema = z
  .object({
    cpf: cpfSchema,
    email: emailSchema,
    cep: cepSchema,
    endereco: z.string().min(1, { message: "Endereço é obrigatório." }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória." }),
    paymentMethod: z.enum(["pix", "card"], {
      message: "Selecione um método de pagamento.",
    }),
    // Campos opcionais do cartão
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    cardName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return (
          data.cardNumber && data.cardExpiry && data.cardCvv && data.cardName
        );
      }
      return true;
    },
    {
      message: "Preencha todos os dados do cartão",
      path: ["cardNumber"],
    }
  );

// Schema para edição de perfil
export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome é obrigatório." })
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: emailSchema,
  whatsapp: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Campo opcional
        return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val);
      },
      { message: "WhatsApp deve estar no formato (XX) XXXXX-XXXX" }
    ),
  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Campo opcional
        return /^\d{2}\/\d{2}\/\d{4}$/.test(val);
      },
      { message: "Data deve estar no formato DD/MM/AAAA" }
    ),
  cpf: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Campo opcional
        const cpf = val.replace(/\D/g, "");
        return cpf.length === 11;
      },
      { message: "CPF deve conter 11 dígitos." }
    ),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Campo opcional
        const cep = val.replace(/\D/g, "");
        return cep.length === 8;
      },
      { message: "CEP deve conter 8 dígitos." }
    ),
  acceptsPromotions: z.boolean().optional(),
});

// Schema para desativação de conta
export const deactivateAccountSchema = z.object({
  password: passwordSchema,
  reason: z.string().min(1, { message: "Motivo é obrigatório." }),
  confirmDeactivation: z.boolean().refine((val) => val === true, {
    message: "Você deve confirmar a desativação.",
  }),
});

// Schema para validação de perguntas
export const perguntaSchema = z.object({
  titulo: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres"),

  descricao: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),

  tipo: z.enum(
    [
      "MULTIPLA_ESCOLHA",
      "TEXTO_LIVRE",
      "NUMERO",
      "ESCALA_1_10",
      "SIM_NAO",
      "EMAIL",
      "TELEFONE",
      "DATA",
    ],
    {
      message: "Selecione um tipo de pergunta válido",
    }
  ),

  opcoes: z
    .array(z.string().min(1, "Opção não pode ser vazia"))
    .optional()
    .refine((opcoes) => {
      // Se não há opções, é válido (para tipos que não precisam)
      if (!opcoes || opcoes.length === 0) return true;
      // Se há opções, deve ter pelo menos 1 válida
      return opcoes.length > 0;
    }, "Adicione pelo menos uma opção de resposta"),

  obrigatoria: z.boolean(),

  ordem: z
    .number()
    .int("Ordem deve ser um número inteiro")
    .min(0, "Ordem deve ser maior ou igual a 0"),

  questionario_id: z.string().min(1, "ID do questionário é obrigatório"),
});

// Schema específico para validação baseada no tipo
export const perguntaComOpcoesSchema = perguntaSchema.refine(
  (data) => {
    const tiposQueNecessitamOpcoes = ["MULTIPLA_ESCOLHA", "SIM_NAO"];

    if (tiposQueNecessitamOpcoes.includes(data.tipo)) {
      return data.opcoes && data.opcoes.length > 0;
    }

    return true;
  },
  {
    message: "Este tipo de pergunta requer pelo menos uma opção de resposta",
    path: ["opcoes"],
  }
);

// Schema para questionários
export const questionarioSchema = z.object({
  titulo: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),

  descricao: z
    .string()
    .max(300, "Descrição deve ter no máximo 300 caracteres")
    .optional(),

  tipo: z.enum(
    ["AVALIACAO_INICIAL", "ACOMPANHAMENTO", "SATISFACAO", "CUSTOMIZADO"],
    {
      message: "Selecione um tipo de questionário válido",
    }
  ),

  ativo: z.boolean(),

  ordem: z
    .number()
    .int("Ordem deve ser um número inteiro")
    .min(0, "Ordem deve ser maior ou igual a 0"),
});

// Schema para atualização de questionários
export const questionarioUpdateSchema = questionarioSchema.partial().extend({
  id: z.string().min(1, "ID é obrigatório"),
});

// Schema para consultas/avaliações
export const avaliacaoSchema = z.object({
  user_id: z.string().min(1, "ID do usuário é obrigatório"),

  status: z.enum([
    "aguardando_avaliacao",
    "em_analise",
    "requer_esclarecimento",
    "aprovada",
    "negada",
  ]),

  medicamento: z.string().min(1, "Medicamento é obrigatório").optional(),

  dados_questionario: z.record(z.string(), z.any()),

  notas_medicas: z
    .string()
    .max(1000, "Notas médicas devem ter no máximo 1000 caracteres")
    .optional(),

  motivo_negativa: z
    .string()
    .max(500, "Motivo da negativa deve ter no máximo 500 caracteres")
    .optional(),
});

// Schema para produtos
export const produtoSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  descricao: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),

  preco: z
    .number()
    .positive("Preço deve ser maior que zero")
    .max(99999.99, "Preço deve ser menor que R$ 100.000"),

  categoria: z.string().min(1, "Categoria é obrigatória"),

  ativo: z.boolean(),

  estoque: z
    .number()
    .int("Estoque deve ser um número inteiro")
    .min(0, "Estoque não pode ser negativo")
    .optional(),
});

// Types derivados dos schemas
export type PerguntaFormData = z.infer<typeof perguntaSchema>;
export type QuestionarioFormData = z.infer<typeof questionarioSchema>;
export type AvaliacaoFormData = z.infer<typeof avaliacaoSchema>;
export type ProdutoFormData = z.infer<typeof produtoSchema>;

// Função helper para formatlar erros do Zod
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  error.issues.forEach((err) => {
    const path = err.path.join(".");
    formattedErrors[path] = err.message;
  });

  return formattedErrors;
}

// Função helper para validação de formulários
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return {
      success: false,
      errors: { general: "Erro de validação desconhecido" },
    };
  }
}

// Schema para adicionar produto no admin
export const addProductSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "Nome é obrigatório." })
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres." })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres." }),
  descricao: z
    .string()
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres." })
    .optional(),
  preco: z
    .string()
    .min(1, { message: "Preço é obrigatório." })
    .refine(
      (val) => {
        const numVal = parseFloat(val);
        return !isNaN(numVal) && numVal > 0;
      },
      { message: "Preço deve ser um número válido maior que 0." }
    ),
  categoria: z.string().min(1, { message: "Categoria é obrigatória." }),
  estoque: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const numVal = parseInt(val);
        return !isNaN(numVal) && numVal >= 0;
      },
      { message: "Estoque deve ser um número válido maior ou igual a 0." }
    ),
  observacoes: z
    .string()
    .max(300, { message: "Observações deve ter no máximo 300 caracteres." })
    .optional(),
});
