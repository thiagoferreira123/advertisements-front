import { AxiosError } from "axios";
import { notify } from "../components/toast/NotificationIcon";

export const handleAxiosErrorVoid = (error: unknown, defaultMessage: string) => {
  if(error instanceof AxiosError && error.response?.status === 400 && error.response?.data.message) {
    notify(error.response?.data.message, 'Erro', 'close', 'danger');
  } else {
    notify(defaultMessage, 'Erro', 'close', 'danger');
  }

  console.error(error)
}

export const handleAxiosArrayContentError = <T>(error: unknown, defaultMessage: string): (T[] | false) => {

  console.error(error)

  if(error instanceof AxiosError && error.response?.status === 400 && error.response?.data.message) {
    notify(error.response?.data.message, 'Erro', 'close', 'danger');
    return [];
  } else {
    notify(defaultMessage, 'Erro', 'close', 'danger');
    return false;
  }
}

export class AppException extends Error {}