import { create } from "zustand"
import api from "../../../../services/useAxios";
import { Patient } from "../../../../types/Patient";

const patient = localStorage.getItem('patientLogedIn');

interface PatientAuthStore {
  isLoggedIn: boolean;
  patient: Patient | null;

  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  setPatient: (patient: Patient) => void;
}

export const usePatientAuthStore = create<PatientAuthStore>((set) => ({
  isLoggedIn: Boolean(localStorage.getItem('patient')),
  patient: patient ? JSON.parse(patient) : null,

  login: async (password) => {
    const response = await api.get(`/paciente/search-by-password/${password}`);

    localStorage.setItem('patientLogedIn', JSON.stringify(response.data));

    set(() => ({ isLoggedIn: true, patient: response.data }));
  },

  logout: async () => {
    localStorage.removeItem('patientLogedIn');

    set(() => ({ isLoggedIn: false, patient: null }));
  },

  setPatient: (patient) => {
    localStorage.setItem('patientLogedIn', JSON.stringify(patient));

    set(() => ({ isLoggedIn: true, patient }));
  }
}));