import { User } from "../pages/Auth/Login/hook/types";

export interface FormPayload {
  data: string;
  nome: string;
  form: string;
  status: string;
  tipo: string;
  paciente_id?: number;
}

export interface AnsweredFormPayload extends FormPayload {
  nome_paciente: string;
  wpp_paciente: string | null;
  email_paciente: string | null;
  respostas: string | null;
}

export type AnswerObject = {
  id: number;
  id_formulario: string;
  respostas: string;
};

export type AnsweredForm = {
  id: number;
  profissional_id: number;
  data: string;
  nome: string;
  form: string;
  key: string;
  status: string;
  tipo: string;
  respostas: string;
  resposta: AnswerObject | null;
  nome_paciente: string | null;
  email_paciente: string | null;
  wpp_paciente: string | null;
  arquivosAnexados: FileItem[];
  paciente_id?: number;
};

export type FileItem = {
  id: number;
  formulario_id: number;
  file_name: string;
  aws_file_name: string;
};

export type LocalAtendimento = {
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
  profissional: number;
  cor: string;
  ativo: number;
  logo: string;
  dias_semana: string;
  hora_inicio: string;
  hora_final: string;
  almoco_inicio: string;
  almoco_final: string;
  exibir_agenda: number;
  valor_consulta: string;
  valor_retorno: string;
  exibir_valor: number;
  url_base_logo: string;
  duracao_consulta: string;
  duracao_retorno: string;
  endereco_completo: string;
  agendaSecretarias: [
    {
      id: number;
      nome: string;
      email: string;
      senha: string;
      id_profissional: number;
      id_local: number;
    }
  ];
};

export interface Form extends FormPayload {
  profissional_id?: number;
  id_dono?: number;
  key?: string;
  id: number;
  profissional: User;
  resposta: AnswerObject;
}

export type FormItem = {
  type: string;
  subtype?: string;
  label: string;
  required?: boolean;
  name: string;
  className: string;
  userData: string[];
  values: AnsweredFormValue[];
};

export interface AnsweredFormValue {
  value: string;
  label: string;
}

export type FileUploadPayload = {
  id: string;
  files: FormData;
};

export type FormModel = {
  id: string;
  data: string;
  nome: string;
  form: string;
  key: string;
  status: string;
  tipo: string;
  id_dono: number;
};
