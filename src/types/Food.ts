import { ListGroup } from "/src/pages/EquivalentEatingPlan/hooks/equivalentPlanListStore/initialState";
import { Option } from "./inputs";

export interface ReplacementListFood {
  id?: number;
  id_profissional?: number;
  descricao_dos_alimentos: string;
  id_legenda: number;
  unidade: string;
  medidas_caseiras: string;
  gramas: string;
  energia: string;
  proteina: string;
  lipideos: string;
  carboidrato: string;

  [key: string]: string | number | null | boolean | undefined;
}

export interface PersonalEquivalentFood {
  id?: number;
  id_profissional?: number;
  id_alimento: number;
  descricao_dos_alimentos: string;
  unidade: string;
  medida: string;
  gramas: number | string;
  grupo_alimento: string;
  tipo_alimento: string | number;

  alimento: ReplacementListFood;

  selectedGroup?: ListGroup;
  selectedGroupOption?: Option;
}
