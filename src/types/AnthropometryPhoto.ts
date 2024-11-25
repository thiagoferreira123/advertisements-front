export interface AnthropometryPhoto {
    id: number;
    host: string;
    folder: string;
    filename: string;
    section: 'UM' | 'DOIS' | 'TRES'; 
    patient_id: number;
    professional_id: number;
    date: string; 
    observation: string;
  }
  