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
  advertiser_id: string;
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
}

export interface AdvertisementFormValues {
  advertiser_id: string;
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
}

export interface AdvertisementPhotosFormValues {
  photo_url: string;
}

export interface AdvertisementVideosFormValues {
  video_url: string;
}