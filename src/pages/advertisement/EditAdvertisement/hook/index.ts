import { create } from "zustand"
import { Advertisement, AdvertisementStore } from "./types"
import api from "../../../../services/useAxios";

export const useAdvertisement = create<AdvertisementStore>(() => ({
  getAdvertisements: async () => {
    try {
      const response = await api.get<Advertisement[]>('/advertisements/advertiser');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAdvertisement: async (id: string) => {
    try {
      const response = await api.get<Advertisement>(`/advertisements/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createAdvertisement: async (payload) => {
    return await api.post('/advertisements', payload);
  },
  updateAdvertisement: async (id: string, payload) => {
    return await api.put(`/advertisements/${id}`, payload);
  },
}));
