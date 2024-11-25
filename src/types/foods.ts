import { Option } from "./inputs";

export type Food = {
  id: number,
  grupo_id: number,
  descricaoDoAlimento: string,
  medidaCaseira1: string,
  gramas1: string,
  medidaCaseira2: string,
  gramas2: string,
  medidaCaseira3: string,
  gramas3: string,
  medidaCaseira4: string,
  gramas4: string,
  medidaCaseira5: string,
  gramas5: string,
  tabela: string,
  id_alimento_base: number,
  carboidrato_unidade?: number;
  quantidade?: string;
  nutriente_equivalente?: string;
  grupoAlimento?: FoodGroup;

  gramas?: number,
  key: string,
  alimento_key?: string;
  nome?: string;
  medida_selecionada?: MedidaCaseira,
  selectedGroup?: Option,

  carboidrato: number | string,
  proteina: number | string,
  lipideos: number | string,
  energia: number | string,
  colesterol: number,
  cinzas: number,
  calcio: number,
  magnesio: number,
  manganes: number,
  fosforo: number,
  ferro: number,
  sodio: number,
  potassio: number,
  cobre: number,
  zinco: number,
  retinol: number,
  tiamina_vitamina_b1: number,
  riboflavina_vitamina_b2: number,
  piridoxina_vitamina_b6: number,
  niacina_vitamina_b3: number,
  vitamina_c: number,
  acidos_graxos_saturados: number,
  acidos_graxos_monoinsaturados: number,
  acidos_graxos_poliinsaturados: number,
  fibraAlimentar: number;
  selenio: number;
  vitaminaAEquivalenteDeAtividadeDeRetinol: number;
  tiaminaVitaminaB1: number;
  riboflavinaVitaminaB2: number;
  niacinaVitaminaB3: number;
  equivalenteDeNiacinaVitaminaB3: number;
  piridoxinaVitaminaB6: number;
  cobalaminaVitaminaB12: number;
  vitaminaDCalciferol: number;
  vitaminaETotalDeAlphaTocopherol: number;
  vitaminaC: number;
  acidosGraxosSaturados: number;
  acidosGraxosMonoinsaturados: number;
  acidosGraxosPoliinsaturados: number;
  acidosGraxosTransTotal: number;

  [key: string]: string | number | null | MedidaCaseira | boolean | FoodGroup | Option | undefined;
};

export type NutrientInput = {
  energia: number;
  proteina: number;
  lipideos: number;
  carboidrato: number;
  fibraAlimentar: number;
  calcio: number;
  magnesio: number;
  manganes: number;
  fosforo: number;
  ferro: number;
  sodio: number;
  potassio: number;
  cobre: number;
  zinco: number;
  selenio: number;
  retinol: number;
  vitaminaAEquivalenteDeAtividadeDeRetinol: number;
  tiaminaVitaminaB1: number;
  riboflavinaVitaminaB2: number;
  niacinaVitaminaB3: number;
  equivalenteDeNiacinaVitaminaB3: number;
  piridoxinaVitaminaB6: number;
  cobalaminaVitaminaB12: number;
  vitaminaDCalciferol: number;
  vitaminaETotalDeAlphaTocopherol: number;
  vitaminaC: number;
  colesterol: number;
  acidosGraxosSaturados: number;
  acidosGraxosMonoinsaturados: number;
  acidosGraxosPoliinsaturados: number;
  acidosGraxosTransTotal: number;
  [key: string]: string | number | null | MedidaCaseira | boolean | FoodGroup | Option | undefined;
};

export type FoodGroup = {
  id: number,
  descricao: string,
}

export type ShoppingListFood = {
  id?: number,
  key?: string,
  nome: string,
  gramas_7: number,
  gramas_15: number,
  gramas_30: number,
  id_plano: number,
  is_user_input: number,
  update_list: number
}

export type MedidaCaseira = {
  nome: string,
  gramas: number,
}

export type MeasureOption = {
  value: string;
  label: string;
}

export type EquivalentFoodSugestion = {
  sugestao_alimento_equivalente_key: string;
  id: number;
  tabela: string;
  nome: string;
  medida_caseira: string;
  gramas: number;
  carboidrato: number;
  quantidade: number;
  abs_delta_carboidrato: number;
  delta_carboidrato: number;
  nutriente_equivalente: string;
  [key: string]: string | number | MedidaCaseira | null;
}

export type BaseFood = {
  id: number,
  nome: string,
  id_alimento: number
}
