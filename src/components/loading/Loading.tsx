import React, { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    const contentArea = document.querySelector('#contentArea') as HTMLElement;
    const htmlTag = document.documentElement;

    if (!contentArea) {
      htmlTag.setAttribute('data-show', 'false');
    } else {
      contentArea.style.opacity = '0';
    }

    document.body.classList.add('spinner');

    // Função de limpeza que será chamada quando o componente for desmontado
    return () => {
      if (!contentArea) {
        htmlTag.setAttribute('data-show', 'true');
      } else {
        (contentArea).style.opacity = '1';
      }
      document.body.classList.remove('spinner');
    };
  }, []);

  // Sem retorno visual, apenas o efeito colateral da montagem/desmontagem
  return <></>;
};

export default Loading;
