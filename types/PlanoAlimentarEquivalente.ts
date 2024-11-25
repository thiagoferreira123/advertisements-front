export type PlanoAlimentarEquivalente = {
  id: number;
  nome: string;
  idPaciente: number;
  data: Date;
  vrProteinas: number;
  vrCarboidratos: number;
  vrLipideos: number;
  vrCalorias: number;
  vrPeso: number;
  visivel: number;
  periodizacao_inicio: Date;
  periodizacao_fim: Date;
}

export type PlanoAlimentarEquivalenteDia = {
  id: number;
  idPae: string;
  dom: number | null;
  seg: number | null;
  ter: number | null;
  qua: number | null;
  qui: number | null;
  sex: number | null;
  sab: number | null;
}

export type PlanoAlimentarEquivalenteListaDeCompra = {
  id: number;
  nome: string;
  gramas7: number;
  gramas15: number;
  gramas30: number;
  idPlano: number;
  isUserInput: number;
  updateList: number;
}


export type PlanoAlimentarEquivalenteListaPersonalizada = {
  id: number;
  nome_lista: string;
  idUsuario: number;
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
}

export type PlanoAlimentarEquivalenteRefeicao = {
  id: number;
  idPae: string;

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

  Alimentos: PlanoAlimentarEquivalenteRefeicaoAlimento[];
  AlimentosSubstitutos: PlanoAlimentarEquivalenteRefeicaoAlimentoSubstituto[];
  RefeicaoOrdemm: PlanoAlimentarEquivalenteRefeicaoOrdem[];
};


export type PlanoAlimentarEquivalenteRefeicaoAlimento = {
id_alimento: number | null;
  id?: number;
  nome: string;
  quantidade: number;
  medida_caseira: string | null;
  gramas: number;
  kcal: number;
  proteinas: number;
  carboidratos: number;
  lipideos: number;
  id_refeicao: number;
  grupo: string;
  is_avulso: number;
  id_avulso: number | null;
  unidade: number | null;
  key?: string;
};

export type PlanoAlimentarEquivalenteRefeicaoAlimentoSubstituto = {
  id?: number;
  idRefeicao: number;
  idAlimentoSubstituto: number;
  grupoAlimentoSubstituto: string;
  posicao: number;
};


export type PlanoAlimentarEquivalenteRefeicaoOrdem = {
  id: number;
  idRefeicao: number;
  posicao: number;
};

export type PlanoAlimentarEquivalenteGrupo01 = {
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

export type PlanoAlimentarEquivalenteGrupo02 = {
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

export type PlanoAlimentarEquivalenteGrupo03 = {
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


export type PlanoAlimentarEquivalenteGrupo04 = {
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


export type PlanoAlimentarEquivalenteGrupo05 = {
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


export type PlanoAlimentarEquivalenteGrupo06 = {
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


export type PlanoAlimentarEquivalenteGrupo07 = {
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

export type PlanoAlimentarEquivalenteGrupo08 = {
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

export type PlanoAlimentarEquivalenteGrupo09 = {
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

export type PlanoAlimentarEquivalenteGrupo10 = {
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

export type PlanoAlimentarEquivalenteGrupo11 = {
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

export type PlanoAlimentarEquivalenteGrupo12 = {
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

export type PlanoAlimentarEquivalenteGrupo13 = {
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

export type PlanoAlimentarEquivalenteGrupo14 = {
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

export type PlanoAlimentarEquivalenteGrupo15 = {
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


export type PlanoAlimentarEquivalenteGrupoAlimento = {
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

export type PlanoAlimentarEquivalenteGrupoAlimentoSelecionado = {
  id?: number,
  idPae: string,
  grupo: string,
  idAlimento: number,
}
