import { ShoppingListItem } from "./ShoppingList"
import { Food, MeasureOption, MedidaCaseira } from "./foods"

export type ClassicPlan = {
  id?: number
  dataa: string
  observacao: string
  idProfissional?: number
  idPaciente: number | null
  data: string
  vrProteinas: string | number
  vrCarboidratos: string | number
  vrLipideos: string | number
  vrCalorias: string | number
  vrPeso: string | number
  nome: string
  tipoPlano: number
  visivel: number
  recordatorio: number,
  periodizacaoFim: string | null,
  periodizacaoInicio: string | null,
  dias?: WeekDays[],
  meals?: ClassicPlanMeal[],
  orientations?: ClassicPlanOrientation[],
  itensListaCompra?: ShoppingListItem[],
}

export type ClassicPlanOrientation = {
  id?: number,
  orientacao: string,
  orientacao_text: string,
  id_plano: number
}

export type OrientationTemplate = {
  id?: number,
  nome: string,
  orientacao: string,
  id_usuario?: number
}

export type ClassicPlanMeal = {
  id?: number;
  nome: string;
  horario: string;
  idPlanoAlimentar: number;
  obs: string;
  carboidratos: string | number;
  lipideos: string | number;
  proteinas: string | number;
  kcal: string | number;
  calculavel: number;
  html: string;
  tipoTexto: string;
  textoDaRefeicao: string;
  linkImagem: string | null;
  modeloId: number | null;
  alimentos: Array<ClassicPlanMealFood>;
  substituicoes: ClassicPlanReplacementMeal[]; // Defina um tipo específico se necessário
  ordens: ClassicPlanMealOrder[]; // Defina um tipo específico se necessário
}

export type ClassicPlanMealObservation = {
  id: number,
  nome: string,
  comentario: string,
  id_usuario: number
}

export type ClassicPlanMealFood = {
  id?: number | string;
  id_refeicao?: number;
  tabela: string;
  id_alimento: number;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade_medida: number;
  apelido_medida_caseira: string;
  carbohydrate?: string;
  protein?: string;
  lipid?: string;
  calories?: string;
  food?: Food;
  measure?: MedidaCaseira;
  measureOption?: MeasureOption;
  alimentoequivalentes: ClassicPlanMealFoodEquivalent[]; // Defina um tipo específico se necessário
  ordens: ClassicPlanMealFoodOrder[];
}

export type ClassicPlanMealTemplate = {
  id?: number;
  nome: string;
  horario: string;
  idPlanoAlimentar: string;
  obs: string;
  carboidratos: string | number;
  lipideos: string | number;
  proteinas: string | number;
  gramas?: string | number;
  kcal: string | number;
  calculavel: number;
  html: string;
  tipoTexto: string;
  textoDaRefeicao: string;
  linkImagem: string | null;
  modeloId: number | null;
  alimentos: Array<ClassicPlanMealTemplateFood>;
  substituicoes: ClassicPlanReplacementMeal[]; // Defina um tipo específico se necessário
  ordens: ClassicPlanMealOrder[]; // Defina um tipo específico se necessário
}

export type ClassicPlanMealTemplateFood = {
  id?: number | string;
  id_refeicao?: number;
  tabela: string;
  id_alimento: number;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade_medida: number;
  apelido_medida_caseira: string;
  alimentoequivalentes: ClassicPlanMealFoodEquivalent[]; // Defina um tipo específico se necessário
  ordens: ClassicPlanMealFoodOrder;
  carbohydrate?: string;
  protein?: string;
  lipid?: string;
  calories?: string;
  food?: Food;
  measure?: MedidaCaseira;
  measureOption?: MeasureOption;
}

export type ClassicPlanMealFoodEquivalent = {
  id?: number;
  idRefeicaoAlimento?: number;
  idAlimentoEquivalente?: number;
  nomeAlimento: string;
  tabelaEquivalente: string;
  nutrienteEquivalente: string;
  medidaCaseiraEquivalente: string;
  gramasUnidade: number;
  quantidade: number;
  gramasNutriente: number;
  medida_selecionada?: MedidaCaseira;
}

export type ClassicPlanMealOrder = {
  id?: number;
  id_refeicao?: number;
  posicao: number;
}

export type ClassicPlanMealFoodOrder = {
  id?: number;
  id_refeicao?: number;
  id_refeicao_alimento?: number;
  posicao: number;
}

export type ClassicPlanReplacementMeal = {
  id?: number;
  id_refeicao?: number;
  nome: string;
  horario: string;
  obs: string;
  carboidratos: string | number;
  lipideos: string | number;
  proteinas: string | number;
  kcal: string | number;
  html: string;
  tipo_texto: string;
  texto_da_refeicao: string;
  link_imagem: string | null;
  alimentos: ClassicPlanReplacementMealFood[]; // Substitua 'any' pelo tipo apropriado se você souber o tipo dos elementos do array
}

export type ClassicPlanReplacementMealFood = {
  id?: number | string;
  id_refeicao?: number;
  id_alimento: number;
  tabela: string;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade_medida: number;
  apelido_medida_caseira: string;
  alimentoequivalentes: ClassicPlanMealFoodEquivalent[]; // Defina um tipo específico se necessário
  ordens: ClassicPlanMealOrder[];
  carbohydrate?: string;
  protein?: string;
  lipid?: string;
  calories?: string;
  food?: Food;
  measure?: MedidaCaseira;
  measureOption?: MeasureOption;
}


export type createConfigurations = {
  nome: string,
  periodizacaoFim?: string | Date,
  periodizacaoInicio?: string | Date,
  [key: string]: string | Date | undefined;
}

export type WeekDays = {
  id?: number,
  dom: number,
  seg: number,
  ter: number,
  qua: number,
  qui: number,
  sex: number,
  sab: number,
  [key: string]: number | undefined;
}

export function isClassicPlanMeal(selectedMeal: unknown): selectedMeal is ClassicPlanMeal {

  if (!selectedMeal) return false;

  return typeof selectedMeal === 'object' &&
    'id' in selectedMeal &&
    'nome' in selectedMeal &&
    'horario' in selectedMeal &&
    'obs' in selectedMeal &&
    'substituicoes' in selectedMeal
}

export function isClassicPlanMealTemplate(selectedMeal: unknown): selectedMeal is ClassicPlanMealTemplate {

  if (!selectedMeal) return false;

  return typeof selectedMeal === 'object' &&
    'id' in selectedMeal &&
    'nome' in selectedMeal &&
    'horario' in selectedMeal &&
    'obs' in selectedMeal &&
    'substituicoes' in selectedMeal
}