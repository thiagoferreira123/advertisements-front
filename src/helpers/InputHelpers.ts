export function sanitizeString(description: string): string {
  return description.replace(/<[^>]*>?/gm, '');
}

export const htmlToPlainText = (html: string) => {
  // Criar um elemento div temporário e inserir o HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Converter <br> e <p> em quebras de linha
  tempDiv.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
  tempDiv.querySelectorAll('p').forEach(p => p.textContent = p.textContent + '\n');

  // Obter o texto do elemento, que agora contém quebras de linha em vez de tags HTML
  const plainText = tempDiv.textContent ?? '';

  // Retornar o texto sem tags HTML
  return plainText;
}

export const regexNumber = (value: string) => {
  return value.replace(/[^0-9]/g, '');
}

export const regexNumberFloat = (value: string) => {
  return value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '');
}

export const regexNumberRoundedFloat = (value: string) => {
  const regex = /^(\d+\.\d*?[1-9])\d+$/gm;

  return value.replace(regex, "$1");
}