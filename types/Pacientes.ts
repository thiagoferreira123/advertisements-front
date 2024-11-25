export type PacienteType = {
    id: number;
    nome: string;
    cpf?: string;
    genero?: number;
    data: Date;
    primeiraConsulta: Date;
    ultimaConsulta: Date;
    numero?: string;
    email: string;
    cep?: number;
    endereco?: string;
    obs?: string;
    tratamento?: string;
    profissional: number;
    anamnese?: string;
    ddiPais: string;
    ddi: string;
    telefone?: string;
    celular?: string;
    tipoTratamento?: string;
    statusConsulta?: string;
    prontuario?: string;
    gestante: number;
    estado: string;
    cidade: string;
    complemento?: string;
    situacaoEspecial: number;
    msgAusenciaDisparada: number;
    foto?: string;
    idLocal?: number;
    bairro?: string;
    numeroRua?: string;
    appPlanos: number;
    appAvaliacoes: number;
    appMetas: number;
    appReceitas: number;
    appSuplementacao: number;
    appDiario: number;
    inativarApp?: Date;
    deviceToken?: string;
    ativo: number;
  };