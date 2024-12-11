import { QueryClient } from "@tanstack/react-query";

export type AdvertisementStore = {
  getAdvertisements: () => Promise<Advertisement[]>;
  getAdvertisement: (id: string) => Promise<Advertisement>;

  updateAdvertisement: (id: string, values: AdvertisementFormValues) => Promise<void>;

  createAdvertisement: (values: AdvertisementFormValues) => Promise<Advertisement>;

  deleteAdvertisement: (id: string, queryClient: QueryClient) => Promise<void>;
}

export interface Advertisement {
  advertisement_id: string;
  cycle: AdvertisementSubscriptionCycle;
  advertiser_id: string;
  whatsapp: string | null;
  checked: boolean;
  state: string;
  city: string;
  title: string;
  description: string;
  availability: string;
  highlighted: boolean | null;
  age: number;
  paymentLink: string;
  asaasSubscriptionId: string | null;
  locations: string[];
  categories: string[];
  public: string[];
  physical_characteristics: {
    [key: string]: string[];
  };
  services_offered_and_not_offered: {
    [key: string]: {
        service: string;
        offered: string;
        description: string;
      
    };
  };
  working_hours: {
    [key: string]: {
      inicio: string;
      fim: string;
    };
  } | null;
  values: {
    [key: string]: string;
  };
  payment_methods: {
    [key: string]: boolean;
  };
  payments: Payment[];
  date_of_creation: string;

  photos: AdvertisementPhoto[];
  videos: AdvertisementVideo[];
  audio_url: string;
  comparison_video: string | null;
  main_photo: string | null;
}

export interface Payment {
  payment_id: string;
  payment_method: string;
  status: string;
}

export interface AdvertisementFormValues {
  advertiser_id: string;
  cycle: AdvertisementSubscriptionCycle;
  state: string;
  city: string;
  title: string;
  description: string;
  availability: string;
  age: number;
  locations: string[];
  categories: string[];
  public: string[];
  physical_characteristics: {
    [key: string]: string[];
  };
  services_offered_and_not_offered: {
    [key: string]: {
        service: string;
        offered: string;
        description: string;
      
    };
  };
  working_hours: {
    [key: string]: {
      inicio: string;
      fim: string;
    };
  } | null;
  values: {
    [key: string]: string;
  };
  payment_methods: {
    [key: string]: boolean;
  };
  photos: AdvertisementPhotosFormValues[];
  videos: AdvertisementVideosFormValues[];
  audio_url: string;
  comparison_video: string | null;
  main_photo: string | null;
}

export interface AdvertisementPhoto {
  id: string;
  photo_url: string;
}

export interface AdvertisementPhotosFormValues {
  photo_url: string;
}

export interface AdvertisementVideo {
  id: string;
  video_url: string;
}

export interface AdvertisementVideosFormValues {
  video_url: string;
}

export enum AdvertisementSubscriptionCycle {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  SEMIANNUALLY = 'SEMIANNUALLY',
  YEARLY = 'YEARLY',
}

export enum AdvertisementSubscriptionCycleLabels {
  WEEKLY = 'Semanal',
  BIWEEKLY = 'Quinzenal',
  MONTHLY = 'Mensal',
  SEMIANNUALLY = 'Semestral',
  YEARLY = 'Anual',
}

