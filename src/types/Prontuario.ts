export type Prontuario = {
    id: number;
    id_profissional: number;
    id_paciente: number;
    identificacao: string;
    data: Date;
    texto: string;
}

export type ProntuarioModelo = {
    id: number;
    modelos?: string;
}
