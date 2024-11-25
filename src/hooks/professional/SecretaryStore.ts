import { create } from "zustand";
import api from "../../services/useAxios";
import { QueryClient } from "@tanstack/query-core";
import { notify } from "../../components/toast/NotificationIcon";

export interface Secretary {
  id: number,
  nome: string,
  email: string,
  senha: string,
  id_profissional: number,
  id_local: number
}

interface SecretaryStore {
  getSecretaries: () => Promise<Secretary[] | false>;
  // eslint-disable-next-line no-unused-vars
  addSecretary: (location: Partial<Secretary>, queryClient: QueryClient) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  removeSecretary: (location: Secretary, queryClient: QueryClient) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  updateSecretary: (location: Partial<Secretary>, queryClient: QueryClient) => Promise<boolean>;
}

export const useSecretaryStore = create<SecretaryStore>(() => ({
  getSecretaries: async () => {
    try {
      const { data } = await api.get<Secretary[]>('/agenda-secreataria');

      return data ?? false;
    } catch (error) {
      console.error('Error on get service locations', error);
      return false;
    }
  },

  addSecretary: async (values, queryClient) => {
    try {
      const { data } = await api.post('/agenda-secreataria', values);

      queryClient.setQueryData(['my-secretaries'], (locals: Secretary[]) => {
        return [data, ...locals];
      });

      notify('Acesso cadastrado com sucesso', 'Sucesso', 'check', 'success');

      return data;
    } catch (error) {
      notify('Erro ao cadastrar acesso', 'Erro', 'close', 'danger');
      console.error(error);
      return false;
    }
  },

  removeSecretary: async (location, queryClient) => {
    try {
      await api.delete(`/agenda-secreataria/${location.id}`);

      queryClient.setQueryData(['my-secretaries'], (locals: Secretary[]) => {
        return locals.filter((local) => local.id !== location.id);
      });

      notify('Acesso removido com sucesso', 'Sucesso', 'bin');

      return true;
    } catch (error) {
      notify('Erro ao remover acesso ', 'Erro', 'error-hexagon', 'danger');
      console.error(error);
      return false;
    }
  },

  updateSecretary: async (values, queryClient) => {
    try {
      const { data } = await api.put(`/agenda-secreataria/${values.id}`, values);

      queryClient.setQueryData(['my-secretaries'], (locals: Secretary[]) => {
        return locals.map((local) => {
          if (local.id === values.id) {
            return { ...local, ...values };
          }

          return local;
        });
      });

      notify('Acesso atualizado com sucesso', 'Sucesso', 'check', 'success');

      return data;
    } catch (error) {
      notify('Erro ao atualizar acesso', 'Erro', 'close', 'danger');
      console.error(error);
      return false;
    }
  },
}));