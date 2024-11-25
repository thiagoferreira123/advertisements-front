import { create } from "zustand";
import api from "../services/useAxios";
import { Message } from "../services/useFirebase";
import { Patient } from "../types/Patient";
import { QueryClient } from "@tanstack/react-query";
import { notify } from "../components/toast/NotificationIcon";
import axios from "axios";

interface ChatNotificationState {
  getNotifications: () => Promise<ChatNotification[] | false>
  // eslint-disable-next-line no-unused-vars
  updateNotification: (notification: Partial<ChatNotification> & { token: string }, queryClient: QueryClient) => Promise<boolean>,
  // eslint-disable-next-line no-unused-vars
  push: (message: Message, paciente_id: number, profissional_id: number) => void
}

export interface ChatNotification {
  id: number,
  token: string,
  content: string,
  data: string,
  lida: number,
  patient: Partial<Patient>,
}

export const useChatNotification = create<ChatNotificationState>(() => {
  const url = "https://push.OdontCloud.com.br/chat_push";

  const prepareMessage = (message: Message) => {
    if (!message.content) return false;

    let message_preview = message.content;

    if (message.message_type != "text") {
      message_preview = message.message_type.includes('image') ? 'Enviou uma imagem' : 'Enviou um arquivo';
    }

    return message_preview;
  }

  const push = async (message: Message, paciente_id: number, profissional_id: number) => {
    try {
      const content = prepareMessage(message);

      if (!content) {
        return;
      }

      const payload = {
        paciente_id: paciente_id.toString(),
        profissional_id: profissional_id.toString(),
        message_preview: content,
      }

      await axios.post(url, payload, {
        // timeout: 100_000,
        // withCredentials: true,
        // headers: {
        //   'X-Custom-Header': 'foobar',
        // },
      });
    } catch (error) {
      console.error(error);
      notify('Erro ao notificar paciente', 'Erro', 'close', 'danger')
    }
  }

  return {
    push,
    getNotifications: async () => {
      try {
        const { data } = await api.get<ChatNotification[]>('/notificacao-chat-mobile/professional');

        return data;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    updateNotification: async (notification, queryClient) => {
      try {

        queryClient.setQueryData(['unread-notifications'], (notifications: ChatNotification[]) => {
          return notifications && notifications.length ? notifications.filter((n) => n.token !== notification.token) : notifications;
        });

        queryClient.setQueryData(['notifications'], (notifications: ChatNotification[]) => {
          return notifications && notifications.length ? notifications.map((n) => n.token === notification.token ? { ...n, lida: 1 } : n) : notifications;
        });

        const { data } = await api.patch('/notificacao-chat-mobile/' + notification.token, {
          lida: 1,
        });

        return data;
      } catch (error) {
        notify('Erro ao marcar mensagem como lida', 'Erro', 'close', 'danger');
        console.error(error);
        return false;
      }

    }
  }
})