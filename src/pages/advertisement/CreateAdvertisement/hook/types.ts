export type AdvertisementStore = {
  createAdvertisement: (values: AdvertisementFormValues) => Promise<void>;
  getAdvertisements: () => Promise<Advertisement[]>;
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
  traits: string[];
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
  traits: string[];
  photos: AdvertisementPhotosFormValues[];
  videos: AdvertisementVideosFormValues[];
}

export interface AdvertisementPhotosFormValues {
  photo_url: string;
}

export interface AdvertisementVideosFormValues {
  video_url: string;
}