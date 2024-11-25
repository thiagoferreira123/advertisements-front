export interface SendingMaterial<T> {
  id: string;
  nome: string;
  data: string;
  material: string;
  tabela: string;
  options?: T;
}

export type MaterialOptions = EquivalentEatingPlanMaterials | ClassicEatingPlanMaterials | QualitativeEatingPlanMaterials;

export interface ClassicEatingPlanMaterials {
  id: number;
  id_paciente: number;
  lista_compras: 'S' | 'N';
  comentario: 'S' | 'N';
  orientacao: 'S' | 'N';
  micronutrientes: 'S' | 'N';
}

export interface EquivalentEatingPlanMaterials {
  id: number;
  id_paciente: number;
  lista_compras: 'S' | 'N';
  comentario: 'S' | 'N';
  orientacao: 'S' | 'N';
  lista_substituicao: 'S' | 'N';
}

export interface QualitativeEatingPlanMaterials {
  id: number;
  id_paciente: number;
  lista_compras: 'S' | 'N';
  orientacao: 'S' | 'N';
}

export interface MaterialItemProps {
  materials: SendingMaterial<unknown>[];
  index: number;
}