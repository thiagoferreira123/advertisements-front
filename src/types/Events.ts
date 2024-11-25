import { ScheduleStatus, ScheduleType } from "../pages/Calendar/hooks/ScheduleStore/types";

export enum EventColor {
  CONSULTA = '#009ee3',
  RETORNO = '#ebb71a',
  POSSIVEL_RETORNO = '#cf2637',
  OUTROS = '#558df3',
  AGENDADO_SITE = '#5de3c8',
}

export interface EventColorMap {
  [index: string]: string;
}

export const eventColorMap: EventColorMap = {
  [ScheduleType.CONSULTA]: EventColor.CONSULTA,
  [ScheduleType.RETORNO]: EventColor.RETORNO,
  [ScheduleType.POSSIVEL_RETORNO]: EventColor.POSSIVEL_RETORNO,
  [ScheduleType.OUTROS]: EventColor.OUTROS,
  [ScheduleType.AGENDADO_SITE]: EventColor.AGENDADO_SITE,
};

export enum EventStatusColor {
  CONFIRMED = '#009ee3',
  PENDING = '#ebb71a',
  SCHEDULED = '#ebb71a',
  CANCELLED = '#cf2637',
  NO_SHOW = '#558df3',
}

export interface EventStatusColorMap {
  [key: string]: string;
}

export const eventStatusColorMap: EventStatusColorMap = {
  [ScheduleStatus.CONFIRMADO]: EventStatusColor.CONFIRMED,
  [ScheduleStatus.PENDENTE]: EventStatusColor.PENDING,
  [ScheduleStatus.AGENDADO]: EventStatusColor.SCHEDULED,
  [ScheduleStatus.CANCELADO]: EventStatusColor.CANCELLED,
  [ScheduleStatus.NAO_COMPARECEU]: EventStatusColor.NO_SHOW,
};

export type CalendarEvent = {
  id: number;
  nome: string;
  ddiPais: string;
  celular: string;
  email: string;
  convenio: number;
  dataConsulta: string;
  horaInicio: string;
  horaFinal: string;
  tipoConsulta: ScheduleType;
  anotacao: string;
  status: ScheduleStatus;
  idProfissional: number;
  idPaciente: number;
  idColaborador: number | null;
  idLocal: number;
  timezone: string | null;
  videoconferencia: string | number | readonly string[] | undefined;
  recorrencia: string;
  recorrenciaTipo: string;
  recorrenciaQuantidade: number;
  recorrenciaDataFim: string | null;
  recorrenciaTipoQtd: number;
  agendaConvenio: {
    id: number;
    nomeConvenio: string;
    responsavel: string;
    dataInsercao: string;
    status: string;
  };
};

export type Local = {
  id: number;
  cep: string;
  nome: string;
  telefone: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
  uf: string;
  cidade: string;
  cor: string;
  ativo: number;
  logo: string;
  url_base_logo: null | string;
  dias_semana: null | string;
  hora_inicio: null | string;
  hora_final: null | string;
  almoco_inicio: null | string;
  almoco_final: null | string;
  exibir_agenda: null | number;
  valor_consulta: null | string;
  valor_retorno: null | string;
  exibir_valor: null | string;
  duracao_consulta: string;
  duracao_retorno: string;
  endereco_completo: null | string;
  profissional: number;
};

export type HealthInsurance = {
  id: number;
  nomeConvenio: string;
  responsavel: string;
  dataInsercao: string;
  status: string;
};

export type WaitingList = {
  id: number;
  nome_paciente: string;
  ddiPais: string;
  celular: string;
  email: string;
  anotacao: string;
  id_convenio: number;
  tipoConsulta: string;
  dataEntradaLista: string;
  idSecretaria: number | null;
  idProfissional: number;
  localId: number;
};

export type EventHistory = {
  id?: number;
  descricao: string;
  data: string;
  ownerType: string;
  ownerId: number;
  idLocal: number;
  idAgendamento: number | null;
  profissional?: {
    id: number;
    nome_completo: string;
  };
};

export type RecurrenceType = 'days' | 'weeks' | 'months';

export const appointmentOptions = [
  { label: 'Consulta', value: ScheduleType.CONSULTA },
  { label: 'Retorno', value: ScheduleType.RETORNO },
  { label: 'Possível Retorno', value: ScheduleType.POSSIVEL_RETORNO },
  { label: 'Outros', value: ScheduleType.OUTROS },
  { label: 'Agendado pelo site', value: ScheduleType.AGENDADO_SITE },
];

export const recurrenceOptions = [
  { label: 'Diário', value: 'days' },
  { label: 'Semanal', value: 'weeks' },
  { label: 'Mensal', value: 'months' },
];

export const statusOptions = [
  { label: 'Pendente', value: ScheduleStatus.AGENDADO },
  { label: 'Desmarcada', value: ScheduleStatus.CANCELADO },
  { label: 'Confirmada', value: ScheduleStatus.CONFIRMADO },
  { label: 'Não compareceu', value: ScheduleStatus.NAO_COMPARECEU },
];
