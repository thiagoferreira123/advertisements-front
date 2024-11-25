import { ActivityLevel } from "../pages/CaloricExpenditure/helpers/MathHelpers";
import { Patient } from "./Patient";

export interface CaloricExpenditure {
  id?: number;
  id_paciente: number;
  dataCriacao: Date;
  nome: string;

  patient?: Patient;

  parametros?: CaloricExpenditureParameters[];
  atividades?: CaloricExpenditureMet[];
}

export interface CaloricExpenditureParameters {
  id: number;

  peso?: number; // nullable: true torna o campo opcional
  altura?: number;

  fator_atividade?: number;
  fator_termico?: number;
  fator_injuria?: number;
  fator_injuria_valor?: number;

  trimestre_gestacao?: 1 | 2 | 3;
  semestre_pos_gestacao?: number;

  massa_magra?: number;

  categoria_formula: number;
  formula: string;

  mes_de_lactacao: number;
  semana_gestacional: number;

  venta_peso_desejado?: number;

  id_gasto_calorico?: number;

  get: number; // valor padrão 0.0, mas não é relevante para a definição da interface
  geb: number; // valor padrão 0.0
  dataAtualizacao: Date;
  fator_atividade_dri_2023: ActivityLevel;
  semestre_amamentação: string;
}

export interface CaloricExpenditureMet {
  id?: number | string;
  id_gasto_calorico: number;
  id_met: number;
  duracao: number;
}