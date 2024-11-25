export type ReceitaCulinaria = {
  id: number;
  nome: string;
  descricao: string | undefined;
  tempo_preparo: string;
  peso_receita: number;
  porcao_receita: string;
  quantidade_porcao: number;
  data_cadastro: Date;
  imagem: string | undefined;
  compartilhada: 'SIM' | 'NAO';
  id_profissional: number;
}

export type Alimento = {
  id: number;
  id_alimento: number;
  tabela: string;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade: number;
  nome_apelido: string;
  medida_caseira_apelido: string;
}

export type CategoriaReceitaCulinaria = {
  id: number;
  id_categoria: number;
  id_receita_culinaria: number;
}

export type ReceitaCulinariaOdontCloudCategoriaDescricao = {
  id: number;
  nome: string;
  id_profissional: number;
}

export type ReceitaCulinariaOdontCloudModoDePreparo = {
  id: number;
  passo_descricao: string;
  passo_numero: number;
}


export type ReceitaCulinariaHistorico = {
  id: number;
  nome: string;
  data_cadastro: Date;
  id_paciente: number;
  receitas: Array<ReceitaCulinariaHistoricoPaciente>
}

export type ReceitaCulinariaHistoricoPaciente = {
  categorias: Array<CategoriaReceitaCulinaria>;
  id: number;
  nome: string;
  descricao: string;
  tempo_preparo: string;
  peso_receita: number;
  porcao_receita: string;
  quantidade_porcao: number;
  data_cadastro: Date;
  imagem: string | undefined;
  id_prescricao: number;
  alimentos: Partial<ReceitaCulinariaHistoricoPacienteAlimento>[]
  preparos: Partial<ReceitaCulinariaHistoricoPacienteModoDePreparo>[]
}

export type ReceitaCulinariaHistoricoPacienteAlimento = {
  id: number;
  id_receita: number;
  id_alimento: number;
  tabela: string;
  medida_caseira: string;
  gramas: number;
  nome: string;
  quantidade: number;
  nome_apelido: string;
  medida_caseira_apelido: string;
}

export type ReceitaCulinariaHistoricoPacienteModoDePreparo = {
  id: number;
  passo_descricao: string;
  passo_numero: number;
  id_receita: number;
}
