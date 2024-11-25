import { create } from "zustand"
import { Advertisement, AdvertisementStore } from "./types"
import api from "../../../../services/useAxios";

export const useAdvertisement = create<AdvertisementStore>(() => ({
  createAdvertisement: async (payload) => {
    return await api.post('/advertisements', payload);
  },
  getAdvertisements: async () => {
    try {
      const response = await api.get<Advertisement[]>('/advertisements/advertiser');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}));
