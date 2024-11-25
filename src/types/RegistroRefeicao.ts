export interface RegistroRefeicao  {
  id: number;
  id_profissional: number;
  comentario: string;
  comentario_nutricionist: string;
  data_comentario: string;
  data_hora_registro: string | null;
  data_registro: string | null;
  hora_comentario: string
  hora_registro: string
  is_liked: boolean
  nome_refeicao: string
  paciente_foto: string | null
  paciente_id: number
  paciente_nome: string
  paciente_sexo: number
  profissional_reaction: string | null;
  registro_imagem: string
}