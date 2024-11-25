export interface DiaryFoodRegister {
  id: number;
  nome_refeicao: string;
  comentario: string;
  comentario_nutricionista: string;
  is_liked: boolean;
  profissional_reaction: null | string; // Assumindo que pode ser string, ajuste conforme o caso real
  registro_imagem: string;
  data_hora_registro: string;
  hora_registro: string;
  data_registro: string;
  hora_comentario: null | string; // Assumindo que pode ser string, ajuste conforme o caso real
  data_comentario: null | string; // Assumindo que pode ser string, ajuste conforme o caso real
  paciente_id: number;
  paciente_foto: string;
  paciente_nome: string;
  paciente_sexo: number; // Assumindo 0 e 1 para masculino e feminino, ajuste conforme necessário
  id_profissional: number;
}