import { ShoppingListItem } from "./ShoppingList";
import { Food, MeasureOption, MedidaCaseira } from "./foods";

export type EquivalentEatingPlan = {
  id?: number;
  nome: string;
  idPaciente: number;
  data: string;
  vrProteinas: number;
  vrCarboidratos: number;
  vrLipideos: number;
  vrCalorias: number;
  vrPeso: number;
  visivel: number;
  favorito?: boolean;
  periodizacaoInicio: string | null;
  periodizacaoFim: string | null;
  lista_id: number;
  meals: EquivalentEatingPlanMeal[];
  dias: EquivalentEatingPlanDays[];
  itensListaCompra: ShoppingListItem[];
  alimentosSelecionados: EquivalentEatingPlanGrupoSelectedFood[];
  orientations: EquivalentEatingPlanOrientation[];
}

export type EquivalentEatingPlanDays = {
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

export type EquivalentEatingPlanShoppingListItem = {
  id: number | string;
  nome: string;
  gramas_7: number;
  gramas_15: number;
  gramas_30: number;
  id_plano: string;
  is_user_input: number;
  update_list: number;
}

export type EquivalentEatingPlanOrientation = {
  id?: number;
  id_plano?: number;
  orientacao: string;
  orientacao_text: string;
}

export type EquivalentEatingPlanCustomList = {
  id?: number;
  nome_lista: string;
  idUsuario?: number;
  sel_grupo_0: string | null;
  sel_grupo_1: string | null;
  sel_grupo_2: string | null;
  sel_grupo_3: string | null;
  sel_grupo_4: string | null;
  sel_grupo_5: string | null;
  sel_grupo_6: string | null;
  sel_grupo_7: string | null;
  sel_grupo_8: string | null;
  sel_grupo_9: string | null;
  sel_grupo_10: string | null;
  sel_grupo_11: string | null;
  sel_grupo_12: string | null;
  sel_grupo_13: string | null;
  sel_grupo_14: string | null;
  grupo_0: string | null;
  grupo_1: string | null;
  grupo_2: string | null;
  grupo_3: string | null;
  grupo_4: string | null;
  grupo_5: string | null;
  grupo_6: string | null;
  grupo_7: string | null;
  grupo_8: string | null;
  grupo_9: string | null;
  grupo_10: string | null;
  grupo_11: string | null;
  grupo_12: string | null;
  grupo_13: string | null;
  grupo_14: string | null;
  kcal: string;
  proteinas: string;
  carboidratos: string;
  gorduras: string;
  desvio_kcal: string;
  desvio_proteinas: string;
  desvio_carboidratos: string;
  desvio_gorduras: string;

  [key: string]: string | number | null | undefined;
}

export type EquivalentEatingPlanMeal = {
  id?: number;
  idPae?: string;

  nome: string;
  comentario: string;
  horario: string;
  calculavel: number;
  comentarioHtml: string | null;
  tipoTexto: string | null;
  textoDaRefeicao: string;
  linkImagem: string | null;

  carbohydrate?: number;
  calories?: number;
  protein?: number;
  fat?: number;

  alimentos: EquivalentEatingPlanMealFood[];
  alimentosSubstitutos: EquivalentEatingPlanMealReplacementFood[];
  ordens: EquivalentEatingPlanRefeicaoOrdem[];

  amounts: Array<number | string>;
};


export type EquivalentEatingPlanMealFood = {
  id_alimento: number | null;
  id?: number | string;
  id_refeicao?: number;
  nome: string;
  quantidade: number;
  medida_caseira: string | null;
  gramas: number;
  kcal: number;
  proteinas: number;
  carboidratos: number;
  lipideos: number;
  grupo: string;
  is_avulso: number;
  id_avulso: number | null;
  unidade: number | null;
  key?: string;
  food?: Food;
  measure?: MedidaCaseira;
  measureOption?: MeasureOption;
};

export type EquivalentEatingPlanMealReplacementFood = {
  id?: number;
  idRefeicao: number;
  idAlimentoSubstituto: number;
  grupoAlimentoSubstituto: string;
  posicao: number;
};


export type EquivalentEatingPlanRefeicaoOrdem = {
  id?: number;
  idRefeicao?: number;
  posicao: number;
};

export type EquivalentEatingPlanGrupo01 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo02 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo03 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};


export type EquivalentEatingPlanGrupo04 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};


export type EquivalentEatingPlanGrupo05 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};


export type EquivalentEatingPlanGrupo06 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};


export type EquivalentEatingPlanGrupo07 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo08 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo09 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo10 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo11 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo12 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo13 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo14 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};

export type EquivalentEatingPlanGrupo15 = {
  id: number;
  id_profissional: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: number;
  medidas_caseiras: string | null;
  gramas: number;
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
};


export type EquivalentEatingPlanGrupoAlimento = {
  id: number,
  id_profissional: number,
  descricao_dos_alimentos: string,
  id_legenda: number,
  unidade: number,
  medidas_caseiras: string | null;
  grupo: string;
  gramas: number,
  energia: number,
  proteina: number,
  lipideos: number,
  carboidrato: number,
  group_id?: number,
};

export type EquivalentEatingPlanGrupoSelectedFood = {
  id?: number | string,
  idPae?: string,
  grupo: string,
  idAlimento: number,
}

export function isEquivalentEatingPlanMealFood(selectedFood: unknown): selectedFood is EquivalentEatingPlanMealFood {

  if (!selectedFood) return false;

  return typeof selectedFood === 'object' &&
    'id' in selectedFood &&
    'nome' in selectedFood
}
