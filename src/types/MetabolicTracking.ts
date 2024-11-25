export interface MetabolicTracking {
    id: number;
    data: Date;
    punctuation: string;
    description: string;
    tracking_full: string;
    patient_id: number;
    professional_id: number;
    released: boolean | null;
  }