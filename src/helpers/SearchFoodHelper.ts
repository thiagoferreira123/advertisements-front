import { Food } from "../types/foods";

const getSuggestionValue = (suggestion: Food) => suggestion.descricaoDoAlimento + '@' + suggestion.id + '@' + suggestion.tabela;

// const escapeRegexCharacters = (str: string) => {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase();
// };

const escapeRegexCharacters = (str: string) => {
  // Substitui letras acentuadas pela sua versão sem acento
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove caracteres que não sejam letras, números ou espaços e substitui por espaço
  str = str.replace(/[^a-zA-Z0-9 çÇ]/g, '');

  // Substitui múltiplos espaços por um único espaço
  str = str.replace(/\s+/g, ' ');

  return str.trim().toLowerCase();
}

export { getSuggestionValue, escapeRegexCharacters };