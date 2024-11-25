import { create } from "zustand";
import api from "../../services/useAxios";
import { Local } from "../../types/Events";
import { QueryClient } from "@tanstack/query-core";
import { notify } from "../../components/toast/NotificationIcon";


interface ServiceLocationStore {

  selectedLocation: Local | null;

  getServiceLocations: () => Promise<Local[] | false>;
  // eslint-disable-next-line no-unused-vars
  addServiceLocation: (location: Partial<Local>, queryClient: QueryClient) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  removeServiceLocation: (location: Local, queryClient: QueryClient) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  updateServiceLocation: (location: Partial<Local>, queryClient: QueryClient) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleToggleLocationStatus: (location: Local, queryClient: QueryClient) => Promise<boolean>;
}

export const useServiceLocationStore = create<ServiceLocationStore>((set) => ({

  selectedLocation: null,

  getServiceLocations: async () => {
    try {
      const { data } = await api.get<Local[]>('/local-atendimento');

      const selectedLocation = data?.find((local) => local.ativo);

      set({ selectedLocation });

      return data ?? false;
    } catch (error) {
      console.error('Error on get service locations', error);
      return false;
    }
  },

  addServiceLocation: async (values, queryClient) => {
    try {
      const { data } = await api.post('/local-atendimento', values);

      queryClient.setQueryData(['my-locals'], (locals: Local[]) => {
        return [data, ...locals];
      });

      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  removeServiceLocation: async (location, queryClient) => {
    try {
      await api.delete(`/local-atendimento/${location.id}`);

      queryClient.setQueryData(['my-locals'], (locals: Local[]) => {
        return locals.filter((local) => local.id !== location.id);
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  updateServiceLocation: async (values, queryClient) => {
    try {
      const { data } = await api.put(`/local-atendimento/${values.id}`, values);

      queryClient.setQueryData(['my-locals'], (locals: Local[]) => {
        return locals.map((local) => {
          if (local.id == values.id) {
            return { ...local, ...values };
          }

          return local;
        });
      });

      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  handleToggleLocationStatus: async (location, queryClient) => {
    try {
      queryClient.setQueryData(['my-locals'], (locals: Local[]) => {
        return locals.map((local) => {
          if (local.id === location.id) {
            return { ...local, ativo: location.ativo };
          }

          return location.ativo ? { ...local, ativo: 0 } : local;
        });
      });

      set({ selectedLocation: location });

      await api.put(`/local-atendimento/${location.id}/toggle-status`, { ativo: !location.ativo });

      notify('Status alterado com sucesso', 'Sucesso', 'check', 'success');

      return true;
    } catch (error) {
      notify('Erro ao alterar status', 'Erro', 'close', 'danger');
      console.error(error);
      return false;
    }
  },
}));