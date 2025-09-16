/**
 * Utilitários para processamento de imagens
 */

/**
 * Redimensiona uma imagem para um tamanho máximo mantendo a proporção
 */
export function resizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calcular novo tamanho mantendo proporção
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Configurar canvas
      canvas.width = width;
      canvas.height = height;

      // Desenhar imagem redimensionada
      ctx?.drawImage(img, 0, 0, width, height);

      // Converter para base64
      try {
        const base64 = canvas.toDataURL("image/jpeg", quality);
        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Erro ao carregar a imagem"));
    };

    // Carregar arquivo como data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Valida se um arquivo é uma imagem válida
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // Verificar tipo de arquivo
  if (!file.type.startsWith("image/")) {
    return {
      valid: false,
      error: "Por favor, selecione apenas arquivos de imagem.",
    };
  }

  // Verificar tamanho do arquivo (máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error:
        "A imagem é muito grande. Por favor, escolha um arquivo menor que 5MB.",
    };
  }

  // Verificar tipos permitidos
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Tipo de arquivo não suportado. Use JPEG, PNG, WebP ou GIF.",
    };
  }

  return { valid: true };
}

/**
 * Converte um arquivo de imagem para base64 redimensionado e altamente comprimido
 */
export async function processImageFile(file: File): Promise<string> {
  // Validar arquivo
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Redimensionar para tamanho menor e comprimir mais agressivamente
  let base64 = await resizeImage(file, 400, 300, 0.5); // Tamanho menor e qualidade menor

  // Verificar tamanho final (máximo ~500KB em base64)
  if (base64.length > 700000) {
    // Tentar com tamanho ainda menor
    base64 = await resizeImage(file, 200, 150, 0.3);
    if (base64.length > 700000) {
      throw new Error(
        "Imagem muito grande. Tente uma imagem menor ou reduza a qualidade."
      );
    }
  }

  return base64;
}
