export const downloadPDF = (data: Blob, fileName: string) => {
  // Cria um Blob a partir dos dados em formato binário
  const blob = new Blob([data], { type: 'application/pdf' });

  // Cria uma URL para o Blob
  const url = window.URL.createObjectURL(blob);

  // Cria um elemento 'a' temporário para disparar o download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  // Adiciona o link ao documento e dispara o download
  document.body.appendChild(link);
  link.click();

  // Limpa a URL e remove o link do documento
  window.URL.revokeObjectURL(url);
  link.remove();
};

export const downloadExcel = (data: Blob, fileName: string) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};