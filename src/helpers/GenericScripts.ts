import axios from "axios";

export const fetchCepData = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    return null;
  }
};

export function maskCep(value: string): string {
  const numericValue = value.replace(/\D/g, "");
  const maskedValue = numericValue.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

  return maskedValue;
}

export const calculateConversion = (saleValue: string, entryRequired: string): string => {
  const saleValueNumber = parseFloat(saleValue.replace(/\./g, '').replace(',', '.').replace('R$', '').trim());
  const percentage = parseFloat(entryRequired.replace('%', '').replace(',', '.').trim());

  if (!isNaN(saleValueNumber) && !isNaN(percentage)) {
    const conversionValue = saleValueNumber * (percentage / 100);
    return formatCurrency(conversionValue.toFixed(2));
  }

  return '';
};

export const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  if (Number.isNaN(parseFloat(numericValue))) return '';

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(numericValue) / 100);

  return formattedValue.replace("R$", "").trim();
};


export const formatPhoneNumber = (value: string): string => {
  let formattedValue = value.replace(/\D/g, '');
  if (formattedValue.length > 10) {
    formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (formattedValue.length > 5) {
    formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (formattedValue.length > 2) {
    formattedValue = formattedValue.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    formattedValue = formattedValue.replace(/^(\d*)/, '($1');
  }
  return formattedValue;
};

export const formatCpfCnpj = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');

  if (numericValue.length <= 11) {
    return numericValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  } else {
    return numericValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
};

export const applyCpfCnpjMask = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  if (numericValue.length <= 11) {
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})?/, '$1.$2.$3-$4');
  }
  return numericValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})?/, '$1.$2.$3/$4-$5');
};

export const maskCpfCnpj = (value: string) => {
  if (value.length === 11) {
    // Máscara para CPF: ***.***.***-**
    return `***.***.${value.slice(6, 9)}-**`;
  } else if (value.length === 14) {
    // Máscara para CNPJ: **.***.***/****-**
    return `**.***.${value.slice(5, 8)}/${value.slice(8, 12)}-**`;
  }
  return value;
};