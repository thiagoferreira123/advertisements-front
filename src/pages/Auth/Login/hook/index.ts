import { create } from "zustand"
import { CreateAuthStore } from "./types"
import api from "../../../../services/useAxios";

const user = localStorage.getItem('user');

export const useAuth = create<CreateAuthStore>((set) => ({
  isLoggedIn: Boolean(localStorage.getItem('user')),
  user: user ? JSON.parse(user) : null,

  login: async (values) => {
    const { data } = await api.post('/advertiser/login', values);

    localStorage.setItem('user', JSON.stringify(data));

    set(() => ({ isLoggedIn: true, user: data }));

    return data;
  },

  register: async (payload) => {
    const response = await api.post('/advertiser', payload);

    localStorage.setItem('user', JSON.stringify(response.data));

    set(() => ({ isLoggedIn: true, user: response.data }));
  },

  logout: async () => {
    await api.get('/advertiser/logout');
    localStorage.removeItem('user');

    set(() => ({ isLoggedIn: false, user: null }));
  },

  forgotPassword: async (values) => {
    await api.post('/advertiser/request-password-reset', values);
  },

  resetPassword: async (values) => {
    const payload = {
      token: values.token,
      newPassword: values.password,
      confirmPassword: values.passwordConfirm
    }

    await api.post('/advertiser/reset-password', payload);
  },

  updateIdentificationImages: async (payload) => {
    await api.put('/advertiser/identification-images', payload);

    set((state) => {
      if (!state.user) return state;

      return { user: { ...state.user, document_photo: payload.document_photo, document_selfie: payload.document_selfie } };
    });

    return true;
  },

  checkAuth: async () => {
    try {
      const { data } = await api.get('/advertiser/check-auth');
      set(() => ({ isLoggedIn: true, user: data }));
      localStorage.setItem('user', JSON.stringify(data));

      return true;
    } catch (error) {
      set(() => ({ isLoggedIn: false, user: null }));
      return false;
    }
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set(() => ({ user }));
  }
}));