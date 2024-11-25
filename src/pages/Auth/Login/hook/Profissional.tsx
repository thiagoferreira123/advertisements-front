import { useMutation } from 'react-query';

const recuperarSenha = async (email: string) => {
    const response = await fetch('http://localhost/api/recuperar-senha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('Erro ao solicitar recuperação de senha');
    }

    return response.json();
};


export const useRecuperarSenha = () => {
    return useMutation(recuperarSenha);
};