import { create } from "zustand";

interface UploadCoverPhotoModalStore {
  showModal: boolean;

  showUploadCoverPhotoModal: () => void;
  hideModal: () => void;
}

export const useUploadCoverPhotoModalStore = create<UploadCoverPhotoModalStore>((set) => ({
  showModal: false,

  showUploadCoverPhotoModal() {
    set({ showModal: true });
  },

  hideModal() {
    set({ showModal: false });
  },
}));