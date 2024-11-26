import { Advertisement } from "@/pages/advertisement/hook/types";
import { create } from "zustand";

interface DeleteAdvertisementConfirmationModalStore {
  showModal: boolean;

  selectedAdvertisement: Advertisement | null;

  handleSelectAdvertisementToRemove: (advertisement: Advertisement) => void;
  hideModal: () => void;
}

export const useDeleteAdvertisementConfirmationModalStore = create<DeleteAdvertisementConfirmationModalStore>((set) => ({
  showModal: false,

  selectedAdvertisement: null,

  handleSelectAdvertisementToRemove(selectedAdvertisement) {
    set({ selectedAdvertisement, showModal: true });
  },

  hideModal() {
    set({ showModal: false });
  },
}));