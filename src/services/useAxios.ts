import axios from 'axios';

// export const apiUrl = 'https://api.odontcloud.com.br';
export const apiUrl = 'http://localhost:3000';
const api = axios.create({
  baseURL: apiUrl,
  timeout: 100000, // Sem underline para melhor legibilidade
  withCredentials: true // Permite cookies e autenticação de sessões cross-origin
});

api.interceptors.response.use(
  response => response, // Se a resposta for bem-sucedida, apenas a retorne sem modificações
  error => {
    // Verifica se o status da resposta é 402 e se a URL atual não inclui '/block'
    // para evitar redirecionamentos repetidos para a mesma página
    if (error.response?.status === 402 && !window.location.href.includes('/block-access')) {
      window.location.href = '/block-access'; // Redireciona para a página /block
      console.log(error.response?.data)
      localStorage.setItem('block', JSON.stringify(error.response?.data))
    }

    // Para os status 401 e 403, mantenha o redirecionamento para a página /login,
    // desde que a URL atual não inclua 'login'
    else if ([401, 403].includes(error.response?.status) && !window.location.href.includes('login')) {
      window.location.href = '/login';
    }

    return Promise.reject(error); // Rejeita a promessa com o erro para tratativas subsequentes
  }
);



export default api;
