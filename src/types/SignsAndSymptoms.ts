export interface SignsAndSymptomsHistoric {
    id: number;
    data: Date;
    symptoms?: string; 
    deficiencies?: string;
    excesses?: string;
    patient_id: number;
  }
  

  export interface SignsAndSymptomsData {
    id: number;
    name?: string;
    body_part?: string;
    body_part_id: number;
    description?: string;
  }
  