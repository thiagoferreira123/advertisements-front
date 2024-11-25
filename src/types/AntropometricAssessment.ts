import { Patient } from "./Patient";

export type AntropometricAssessmentData = AdultAntropometricData | Child0to5AntropometricData | PregnantAntropometricData | BioimpedanceAntropometricData;

export type AntropometricAssessmentHistory<T> = {
  dados_geral_id?: number;
  paciente_id: number;
  id_bioimpedancia?: number;
  dados_id?: number;
  faixa_etaria: number;
  data_registro: number;

  patient?: Patient;

  data?: T;
}

export type AdultAntropometricData = {
  id: number;
  id_paciente: number;
  dataa: Date;
  data_atualizacao: Date | null;

  peso: string | null;
  altura: string | null;
  idade: string | null;
  ombro: string | null;
  peitoral: string | null;
  cintura: string | null;
  abdomen: string | null;
  quadril: string | null;

  panturrilha_direita: string | null;
  panturrilha_esquerda: string | null;

  pescoco: string | null;

  punho_esquerdo: string | null;
  punho_direito: string | null;

  coxa_proximal_direita: string | null;
  coxa_proximal_esquerda: string | null;
  coxa_medial_direita: string | null;
  coxa_medial_esquerda: string | null;
  coxa_distal_direita: string | null;
  coxa_distal_esquerda: string | null;

  braco_relaxado_direito: string | null;
  braco_relaxado_esquerdo: string | null;
  braco_contraido_direito: string | null;
  braco_contraido_esquerdo: string | null;

  antebraco_esquerdo: string | null;
  antebraco_direito: string | null;

  diametro_estilo_ulnar: string | null;
  diametro_bicondio_femural: string | null;

  protocolo: string | null;
  siri_ou_brozek: string | null;

  biceps: string | null;
  triceps: string | null;
  axilar_media: string | null;
  torax: string | null;
  abdominal: string | null;
  suprailiaca: string | null;
  subescapular: string | null;
  coxa: string | null;
  panturrilha_media: string | null;
  peso_osseo: string | null;
  peso_residual: string | null;
  imc: string | null;
  peso_gordo: string | null;
  peso_magro: string | null;
  perc_massa_gorda: string | null;
  perc_massa_magra: string | null;
  soma_dobras: string | null;
  classificacao_pollock: string | null;
  pesoidealimc: string | null;
  densidade: string | null;
  riscocardio: string | null;
  massa_gorda_kg_recomendado: string | null;
  massa_gorda_kg_classificacao: string | null;
  massa_gorda_percentual_recomendado: string | null;
  massa_livre_de_gordura_kg_recomendado: string | null;
  massa_livre_de_gordura_kg_classificacao: string | null;
  massa_livre_de_gordura_percentual_recomendado: string | null;
  massa_livre_de_gordura_percentual_classificacao: string | null;
  massa_muscular_kg_recomendado: string | null;
  massa_muscular_kg_classificacao: string | null;
  massa_muscular_percentual_recomendado: string | null;
  massa_muscular_percentual_classificacao: string | null;
  massa_livre_de_gordura_kg: string | null;
  massa_livre_de_gordura_percentual: string | null;
  peso_recomendado: string | null;
  peso_classificacao: string | null;
  imc_classificacao: string | null;

  [key: string]: string | null | Date | number | undefined;
}
export type Child0to5AntropometricData = {
  id: number;
  idPaciente: number;
  dataa: Date;
  dataAtualizacao: Date;
  peso?: string;
  altura?: string;
  idade?: string;

  ombro?: string;
  peitoral?: string;
  cintura?: string;
  abdomen?: string;
  quadril?: string;

  panturrilhaDireita?: string;
  panturrilhaEsquerda?: string;

  pescoco?: string;
  punhoEsquerdo?: string;
  punhoDireito?: string;

  coxaProximalDireita?: string;
  coxaProximalEsquerda?: string;
  coxaMedialDireita?: string;
  coxaMedialEsquerda?: string;
  coxaDistalDireita?: string;
  coxaDistalEsquerda?: string;

  bracoRelaxadoDireito?: string;
  bracoRelaxadoEsquerdo?: string;
  bracoContraidoDireito?: string;
  bracoContraidoEsquerdo?: string;

  antebracoEsquerdo?: string;
  antebracoDireito?: string;

  pesoAtual?: string;
  pesoReferencia?: string;
  estaturaAtual?: string;
  estaturaParaIdade?: string;
  imcAtual?: string;
  imcReferencia?: string;

  pesoClassificacao?: string;
  comprimentoClassificacao?: string;
  imcClassificacao?: string;

  [key: string]: string | null | Date | number | undefined;
}
export type PregnantAntropometricData = {
  id: number;
  idPaciente: number;
  dataa: Date;

  dataUltMenstruacao?: string;
  altura?: string;
  peso?: string;
  pesoPreGestacional?: string;
  gestacaoGemelar?: number;

  pescoco?: string;
  ombro?: string;
  peitoral?: string;
  abdomen?: string;
  cintura?: string;
  quadril?: string;

  punhoEsquerdo?: string;
  punhoDireito?: string;

  bracoRelaxadoDireito?: string;
  bracoRelaxadoEsquerdo?: string;
  bracoContraidoDireito?: string;
  bracoContraidoEsquerdo?: string;

  antebracoEsquerdo?: string;
  antebracoDireito?: string;

  coxaProximalDireita?: string;
  coxaProximalEsquerda?: string;
  coxaMedialDireita?: string;
  coxaMedialEsquerda?: string;
  coxaDistalDireita?: string;
  coxaDistalEsquerda?: string;

  panturrilha_direita?: string;
  panturrilha_esquerda?: string;

  idadeGestacional?: string;
  recGanhoPeso?: string;
  pesoIdeal?: string;
  imcAtual?: number;
  imcPreGestacional?: number;
  dataProvavelParto?: string;

  classificacao_imc_pre_gestacao: string;
  classificacao_imc_gestacional: string;

  [key: string]: string | null | Date | number | undefined;
}
export type BioimpedanceAntropometricData = {
  idBioimpedancia: string;
  idPaciente: number;
  dataaBioimpedancia: Date;

  pesoBioimpedancia: string;
  alturaBioimpedancia: string;

  ombro: string;
  peitoral: string;
  cintura: string;
  abdomen: string;
  quadril: string;
  panturrilhaDireita: string;
  panturrilhaEsquerda: string;
  pescoco: string;
  punhoEsquerdo: string;
  punhoDireito: string;
  coxaProximalDireita: string;
  coxaProximalEsquerda: string;
  coxaMedialDireita: string;
  coxaMedialEsquerda: string;
  coxaDistalDireita: string;
  coxaDistalEsquerda: string;

  bracoRelaxadoDireito: string;
  bracoRelaxadoEsquerdo: string;
  bracoContraidoDireito: string;
  bracoContraidoEsquerdo: string;

  antebracoEsquerdo: string;
  antebracoDireito: string;

  imcBioimpedancia: string;
  percMassaGordaBioimpedancia: string;
  massaGordaBioimpedancia: string;
  percMassaMagraBioimpedancia: string;
  massaMagraBioimpedancia: string;
  pesoOsseoBioimpedancia: string;
  pesoResidualBioimpedancia: string;
  pesoMuscularBioimpedancia: string;
  gorduraVisceralBioimpedancia: string;
  idadeMetabolicaBioimpedancia: string;
  aguaCorporalBioimpedancia: string;
  percMusculosEsqueleticosBioimpedancia: string;
  percAguaCorporalBioimpedancia: string;
  percGorduraVisceralBioimpedancia: string;

  idAvaliacao: number;
  pesoIdealBioimpedancia: string;

  bioimpedanciaPesoIdealClassificacao?: string | null; // Opcional
  bioimpedanciaPesoIdealRecomendado?: string | null; // Opcional
  bioimpedanciaImcClassificacao?: string | null; // Opcional
  bioimpedanciaMassaGordaKgRecomendado?: string | null; // Opcional
  bioimpedanciaMassaGordaKgClassificacao?: string | null; // Opcional
  bioimpedanciaMassaGordaPercentualRecomendado?: string | null; // Opcional
  bioimpedanciaMassaGordaPercentualClassificacao?: string | null; // Opcional
  bioimpedanciaMassaMagraKgClassificacao?: string | null; // Opcional
  bioimpedanciaMassaMagraPercentualRecomendado?: string | null; // Opcional
  bioimpedanciaMassaMagraPercentualClassificacao?: string | null; // Opcional
  bioimpedanciaMassaMagraKgRecomendado?: string | null; // Opcional

  [key: string]: string | null | Date | number | undefined;
}
export interface Child5to19AntropometricData {
  id: number;
  idPaciente: number;
  dataa: Date;
  dataAtualizacao: Date;
  peso?: string;
  altura?: string;
  idade?: string;
  ombro?: string;
  peitoral?: string;
  cintura?: string;
  abdomen?: string;
  quadril?: string;
  panturrilhaDireita?: string;
  panturrilhaEsquerda?: string;
  pescoco?: string;
  punhoEsquerdo?: string;
  punhoDireito?: string;
  coxaProximalDireita?: string;
  coxaProximalEsquerda?: string;
  coxaMedialDireita?: string;
  coxaMedialEsquerda?: string;
  coxaDistalDireita?: string;
  coxaDistalEsquerda?: string;
  bracoRelaxadoDireito?: string;
  bracoRelaxadoEsquerdo?: string;
  bracoContraidoDireito?: string;
  bracoContraidoEsquerdo?: string;
  antebracoEsquerdo?: string;
  antebracoDireito?: string;
  triceps?: string;
  subescapular?: string;
  percentualGordura?: string;
  pesoAtual?: string;
  pesoParaEstatura?: string;
  estaturaAtual?: string;
  imc?: string;
  imcReferencia?: string;
  diametroEstiloUlnar?: string;
  diametroBicondioFemural?: string;
  pesoOsseo?: string;
  pesoResidual?: string;
  pesoGordo?: string;
  pesoMagro?: string;
  protocolo?: string | null;
  biceps?: string;
  axilarMedia?: string;
  torax?: string;
  abdominal?: string;
  suprailiaca?: string;
  coxa?: string;
  panturrilhaMedia?: string;
  somaDobras?: string;
  massaGordaKgRecomendado?: string | null;
  massaGordaKgClassificacao?: string | null;
  massaGordaPercentualRecomendado?: string | null;
  massaLivreDeGorduraKgRecomendado?: string | null;
  massaLivreDeGorduraKgClassificacao?: string | null;
  massaLivreDeGorduraPercentualRecomendado?: string | null;
  massaLivreDeGorduraPercentualClassificacao?: string | null;
  massaMuscularKgRecomendado?: string | null;
  massaMuscularKgClassificacao?: string | null;
  massaMuscularPercentualRecomendado?: string | null;
  massaMuscularPercentualClassificacao?: string | null;
  massaLivreDeGorduraKg?: string | null;
  massaLivreDeGorduraPercentual?: string | null;
  percMassaMagra?: string | null;
  pesoRecomendado?: string | null;
  pesoClassificacao?: string | null;
  imcClassificacao?: string | null;
  massaGordaPercentualClassificacao?: string | null;

  siri_ou_brozek: string | null;
  densidade: string;
  riscocardio: string | null;

  [key: string]: string | null | Date | number | undefined;
}
