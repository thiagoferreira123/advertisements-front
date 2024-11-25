/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import api from '/src/services/useAxios';
import { ApiError } from '/src/types/ApiError';

interface propsParams {
  days: string;
  idProfissional?: string;
  dataInicio?: string;
  dataFinal?: string;
}

export const GET_REGISTRO_ALIMENTAR = 'GET_REGISTRO_ALIMENTAR';

export function useDiaryFood() {
  const mutationFn = async (params: propsParams): Promise<any> => {
    try {
      if (params.idProfissional || params.dataInicio) {
        const { data } = await api.get(`/registro-alimentar/periodo/${params.idProfissional}?startDate=${params.dataInicio}&endDate=${params.dataFinal}`);
        return data;
      } else {
        const { data } = await api.get(`/registro-alimentar/${params.days}dias`);
        return data;
      }
    } catch (error) {
      throw error as ApiError;
    }
  };

  return useMutation<any, ApiError, propsParams>({
    mutationKey: [GET_REGISTRO_ALIMENTAR],
    mutationFn,
  });
}
