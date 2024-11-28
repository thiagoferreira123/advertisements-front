import { QueryClient } from "@tanstack/react-query";

export type AdvertisementStore = {
  getAdvertisements: () => Promise<Advertisement[]>;
  getAdvertisement: (id: string) => Promise<Advertisement>;

  updateAdvertisement: (id: string, values: AdvertisementFormValues) => Promise<void>;

  createAdvertisement: (values: AdvertisementFormValues) => Promise<void>;

  deleteAdvertisement: (id: string, queryClient: QueryClient) => Promise<void>;
}

export interface Advertisement {
  advertisement_id: string;
  cycle: AdvertisementSubscriptionCycle;
  advertiser_id: string;
  name: string;
  state: string;
  city: string;
  title: string;
  description: string;
  availability: string;
  price: number;
  age: number;
  paymentLink: string;
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
  };
  values: {
    [key: string]: string;
  };
  payment_methods: {
    [key: string]: boolean;
  };
  payments: Payment[];
  date_of_creation: string;

  photos: AdvertisementPhotosFormValues[];
  videos: AdvertisementVideosFormValues[];
  audio_url: string;
  comparison_video: string;
  main_photo: string;
}

export interface Payment {
  payment_id: string;
  payment_method: string;
  status: string;
}

export interface AdvertisementFormValues {
  advertiser_id: string;
  cycle: AdvertisementSubscriptionCycle;
  name: string;
  state: string;
  city: string;
  title: string;
  description: string;
  availability: string;
  price: number;
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
  };
  values: {
    [key: string]: string;
  };
  payment_methods: {
    [key: string]: boolean;
  };
  photos: AdvertisementPhotosFormValues[];
  videos: AdvertisementVideosFormValues[];
  audio_url: string;
  comparison_video: string;
  main_photo: string;
}

export interface AdvertisementPhotosFormValues {
  photo_url: string;
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

