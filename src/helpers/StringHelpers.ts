import DOMPurify from 'dompurify';

export function toCamelCase(str: string) {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        // Mantém a primeira palavra em minúsculas
        return word.toLowerCase();
      } else {
        // Capitaliza a primeira letra das palavras subsequentes
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join('');
}

export function encodeURL(url: string) {
  url = url.replace(/ /g, '%20');

  url = url.replace(/&/g, '%26');

  return url;
}

export const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html);
};

export const urlRegex = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

export function convertPlainTextToHTML(text: string) {
  return `<p>${text.replace(/\n/g, '<br>')}</p>`;
}

export const escapeRegexCharacters = (str: string) => {
  // Substitui letras acentuadas pela sua versão sem acento
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove caracteres que não sejam letras, números ou espaços e substitui por espaço
  str = str.replace(/[^a-zA-Z0-9 çÇ]/g, '');

  // Substitui múltiplos espaços por um único espaço
  str = str.replace(/\s+/g, ' ');

  return str.trim().toLowerCase();
}

export const extractNumber = (texto: string) => {
  const regex = /^(\d+)/;
  const match = texto.match(regex);
  return match ? match[0] : null;
}

export const validateCPF = (value: string) => {
  // Se não for string, o CPF é inválido
  if (typeof value !== 'string') {
      return false;
  }

  // Remove todos os caracteres que não sejam números
  value = value.replace(/[^\d]+/g, '');

  // Se o CPF não tem 11 dígitos ou todos os dígitos são repetidos, o CPF é inválido
  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
      return false;
  }

  // Transforma de string para number[] com cada dígito sendo um número no array
  const digits = value.split('').map(el => +el);

  // Função que calcula o dígito verificador de acordo com a fórmula da Receita Federal
  function getVerifyingDigit(arr: number[]) {
      const reduced = arr.reduce( (sum, digit, index)=>(sum + digit * (arr.length - index + 1)), 0 );
      return (reduced * 10) % 11 % 10;
  }

  // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
  return getVerifyingDigit(digits.slice(0, 9)) === digits[9]
      && getVerifyingDigit(digits.slice(0, 10)) === digits[10];
}

export function parseNumberToWhatsapp(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/\s/g, '').replace(/[^\w\s]/gi, '');

  // Remove o zero inicial se houver
  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1);
  }

  // Extrai o DDD (os dois primeiros dígitos)
  const ddd = parseInt(phoneNumber.slice(0, 2));
  let numero = phoneNumber.slice(2);

  // Verifica se o DDD é maior que 30 e se o número começa com 9
  if (ddd > 30 && numero.startsWith('9')) {
    // Remove o primeiro '9' do número
    numero = numero.substring(1);
  }

  // Retorna o telefone ajustado
  return `${ddd}${numero}`;
}

export function parseBrValueToNumber(value: string) {
  return Number(value.replace('.', '').replace(',', '.'));
}

export const truncateString = (message: string, maxLength: number = 128) => {
  return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
};