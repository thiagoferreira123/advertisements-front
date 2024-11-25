import { User } from "/src/hooks/entities/Auth";
import { Food, MeasureOption, MedidaCaseira } from "./foods";

export type Recipe = {
  id?: number;
  nome: string;
  descricao?: string;
  tempo_preparo: string;
  peso_receita: number;
  porcao_receita: string;
  quantidade_porcao: number;
  data_cadastro: string;
  imagem?: string;
  compartilhada: 'SIM' | 'NAO';
  id_profissional?: number;
  preparos: RecipeHistoryRecipeMethodOfPreparation[];
  alimentos: Alimento[];
  categorias: CategoriaRecipe[];
  user?: User;

  carboidratos_por_porcao: string,
  carboidratos_por_cem_gramas:string,
  proteinas_por_porcao: string,
  proteinas_por_cem_gramas:string,
  lipideos_por_porcao: string,
  calorias_por_porcao: string,
  fibras_por_porcao: string,
  calcio_por_porcao: string,
  sodio_por_porcao: string,
  acidos_graxos_saturados_por_porcao: string,
  colesterol_por_porcao: string,
  lipideos_por_cem_gramas: string,
  calorias_por_cem_gramas: string,
  fibras_por_cem_gramas: string,
  calcio_por_cem_gramas: string,
  sodio_por_cem_gramas: string,
  acidos_graxos_saturados_por_cem_gramas: string,
  colesterol_por_cem_gramas: string,
}

export type Alimento = {
  id?: number;
  id_alimento: number;
  tabela: string;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade: number;
  nome_apelido: string;
  medida_caseira_apelido: string;
}

export type CategoriaRecipe = {
  id?: number;
  id_receita_culinaria?: number;
  id_categoria: number;
  categoriaName?: RecipeCategory;
}

export type RecipeCategory = {
  id: number;
  nome: string;
  id_profissional: number;
}

export type RecipeOdontCloudModoDePreparo = {
  id: number;
  passo_descricao: string;
  passo_numero: number;
}


export type RecipeHistory = {
  id?: number;
  nome: string;
  data_cadastro: string;
  id_paciente: number;
  receitas: Array<RecipeHistoryRecipe>
}

export type RecipeHistoryRecipe = {
  categorias: Array<CategoriaRecipe>;
  id: number | string;
  id_prescricao?: number;
  nome: string;
  descricao?: string;
  tempo_preparo: string;
  peso_receita: number;
  porcao_receita: string;
  quantidade_porcao: number;
  data_cadastro: Date;
  imagem?: string | undefined;
  alimentos: RecipeHistoryRecipeFood[]
  preparos: RecipeHistoryRecipeMethodOfPreparation[]
}

export type RecipeHistoryRecipeFood = {
  id?: number | string;
  id_receita?: number;
  id_alimento?: number;
  tabela: string;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade: number;
  nome_apelido: string;
  medida_caseira_apelido: string;

  food?: Food;
  measure?: MedidaCaseira;
  measureOption?: MeasureOption;

  carboidratos?: number;
  proteinas?: number;
  lipideos?: number;
  kcal?: number;
}

export type RecipeHistoryRecipeMethodOfPreparation = {
  id?: number | string;
  id_receita?: number;
  passo_descricao: string;
  passo_numero: number;
}


// interface Alimento {
//   id: number;
//   id_alimento: number;
//   tabela: string;
//   medida_caseira: string;
//   gramas: number;
//   nome: string;
//   quantidade: number;
//   nome_apelido: string;
//   medida_caseira_apelido: string;
// }

// interface Categoria {
//   id: number;
//   id_categoria: number;
//   id_receita_culinaria: number;
// }

// interface Preparo {
//   id: number;
//   passo_descricao: string;
//   passo_numero: number;
// }

// interface Recipe {
//   id: number;
//   nome: string;
//   descricao: string;
//   tempo_preparo: string;
//   peso_receita: number;
//   porcao_receita: string;
//   quantidade_porcao: number;
//   data_cadastro: string;
//   imagem: string;
//   compartilhada: string;
//   id_profissional: number;
//   alimentos: Alimento[];
//   categorias: Categoria[];
//   preparos: Preparo[];
// }
