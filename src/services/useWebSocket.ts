import { useEffect, useState, useRef, useCallback } from 'react';

interface UseWebSocketReturn {
  messages: string[];
  isOpen: boolean;
  sendMessage: (message: string) => void;
  setShouldReconnect: (shouldReconnect: boolean) => void;
}

function useWebSocket(url: string): UseWebSocketReturn {
  const [shouldReconnect, setShouldReconnect] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const webSocketRef = useRef<WebSocket | null>(null);

  // Função para enviar mensagens para o servidor WebSocket
  const sendMessage = useCallback((message: string) => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(message);
    }
  }, []);

  // Efeito para abrir a conexão WebSocket
  useEffect(() => {
    if(!shouldReconnect || !url) return;

    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setIsOpen(true);
    };

    webSocket.onmessage = (event: MessageEvent) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsOpen(false);
    };

    webSocket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    webSocketRef.current = webSocket;

    return () => {
      webSocket.close();
    };
  }, [url, shouldReconnect]);

  return {
    messages,
    isOpen,
    sendMessage,
    setShouldReconnect,
  };
}

export default useWebSocket;
