
export function calculateYearsDiffByDateISO(day1: string, day2?: string): number {
  const today = day2 ? new Date(day1 + ' 00:00:00') : new Date();
  const birthDate = new Date(day1 + ' 00:00:00');
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

export function calculateMonthsDiffByDateISO(day1: string, day2?: Date | string | number): number {
  if(typeof day2 === 'string') {
    day2 = new Date(day2 + ' 00:00:00');
  } else if(typeof day2 === 'number') {
    day2 = new Date(day2 * 1000);
  }

  const today = day2 ? day2 : new Date();
  const birthDate = new Date(day1 + ' 00:00:00');
  let age = today.getMonth() - birthDate.getMonth();
  const yearDifference = today.getFullYear() - birthDate.getFullYear();

  if (yearDifference > 0) {
    age += yearDifference * 12;
  }

  return age;
}

export function calculateDaysDiffByDateISO(day1: Date | string, day2?: string): number {
  if(typeof day2 === 'string') {
    day1 = new Date(day1 + ' 00:00:00');
  } else if(typeof day1 === 'number') {
    day1 = new Date(day1 * 1000);
  } else {
    day1 = new Date(day1);
  }

  const today = day2 ? new Date(day2 + ' 00:00:00') : new Date();

  if(isValidDate(today) === false || isValidDate(day1) === false) {
    console.error('Invalid date');
    return 0;
  }

  const difference = today.getTime() - day1.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export function convertTimeToMinutes(time: string): number {
  const parts = time.split(':');

  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);

  let totalMinutes = hours * 60 + minutes;

  if (seconds >= 30) {
      totalMinutes++;
  }

  return totalMinutes;
}

export function convertTimeToSimple(time: string): string {
  return time.split(':').slice(0, 2).join(':');
}

export function convertIsoToBrDate(date: string): string {
  return date.split('-').reverse().join('/');
}

export function convertInvertedIsoToIso(date: string): string {
  return date.split('-').reverse().join('-');
}

export function convertIsoToExtensiveBrDate(date: string): string {
  const d = new Date(convertInvertedIsoToIso(date) + ' 00:00:00');
  return (d).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function parseDateToIso(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseIsoToDate(date: string): Date {
  return new Date(date + ' 00:00:00');
}

export function parseBrDateToIso(date: string): string {
  return date.split('/').reverse().join('-');
}

export function formatDateToHumanReadable(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateMonthToHumanReadable(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' });
}

export function addDaysToDate(date: Date | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonthsToDate(date: Date | string, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function isBefore(date1: Date | string, date2: Date | string): boolean {
  return new Date(date1).getTime() < new Date(date2).getTime();
}

export function isAfter(date1: Date | string, date2: Date | string): boolean {
  return new Date(date1).getTime() > new Date(date2).getTime();
}

export function checkIfDateIsValid(date: Date): boolean {
  return isValidDate(date);
}

export function getLastFourYears(): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 4; i++) {
    years.push(currentYear - i);
  }

  return years;
}

export const excelSerialDateToJSDate = (serial: number) => {
  const excelEpoch = new Date(1900, 0, -1); // Iniciação da época do Excel ajustada para JS
  const jsDate = new Date(excelEpoch.getTime() + serial * 86400000); // 86400000 ms por dia
  return jsDate;
};

export const isValidExcelDate = (value: number): boolean => {
  if (typeof value !== 'number' || isNaN(value) || value < 1) {
    return false; // Verifica se o valor é um número e está dentro de uma faixa aceitável
  }

  const excelEpoch = new Date(1900, 0, -1); // Data base para o sistema de data de 1900
  const jsDate = new Date(excelEpoch.getTime() + value * 86400000); // Conversão para data JS

  // Verifica se a data JS resultante é válida
  return jsDate instanceof Date && !isNaN(jsDate.getTime());
};

export function formatTimeAgo(date: string): string {
  const now = new Date();
  const timestamp = new Date(date).getTime();
  const difference = now.getTime() - timestamp;

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} semana${weeks > 1 ? 's' : ''} atrás`;
  } else if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  } else if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
  } else {
    return `${seconds} segundo${seconds > 1 ? 's' : ''} atrás`;
  }
}

export const monthOptions = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];