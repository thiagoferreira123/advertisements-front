export interface MaterialsRegisteredByProfessional {
    name: string;
    s3_link: string;
    user_link?: string; // Opcional porque é nullable
    user_text?: string; // Opcional porque é nullable
    professional_id: number;
  }
  