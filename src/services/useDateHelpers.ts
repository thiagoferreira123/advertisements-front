import { ClassicPlan, WeekDays } from "/src/types/PlanoAlimentarClassico";
import { EquivalentEatingPlan } from "/src/types/PlanoAlimentarEquivalente";
import { QualitativeEatingPlan } from "../pages/PatientMenu/qualitative-eating-plan/hooks/eating-plan/types";

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // adiciona zero à esquerda se necessário
  const day = String(date.getDate()).padStart(2, '0'); // adiciona zero à esquerda se necessário

  return `${year}-${month}-${day}`;
}

const isCurrentDateBetween = (plan: Partial<ClassicPlan | EquivalentEatingPlan>) => {

  if (!plan.periodizacaoInicio || !plan.periodizacaoFim) return false;

  const startDate = convertToDate(plan.periodizacaoInicio);
  const endDate = convertToDate(plan.periodizacaoFim);
  const currentDate = new Date();

  if (!startDate || !endDate) return false;

  // Certifique-se de que as horas, minutos, segundos e milissegundos não afetem a comparação
  currentDate.setHours(0, 0, 0, 0);

  return currentDate >= startDate && currentDate <= endDate;
}

export const simpleIsCurrentDateBetween = (periodizacaoInicio: string, periodizacaoFim: string) => {

  if (!periodizacaoInicio || !periodizacaoFim) return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;

  const startDate = periodizacaoInicio.match(regex) ?  convertToDate(periodizacaoInicio) : new Date(periodizacaoInicio);
  const endDate = periodizacaoFim.match(regex) ?  convertToDate(periodizacaoFim) : new Date(periodizacaoFim);
  const currentDate = new Date();

  if (!startDate || !endDate) return false;

  // Certifique-se de que as horas, minutos, segundos e milissegundos não afetem a comparação
  currentDate.setHours(0, 0, 0, 0);

  return currentDate >= startDate && currentDate <= endDate;
}

const convertToDate = (dateString: string): Date | undefined => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(dateString)) {
    console.error('Formato de data inválido. Use YYYY-MM-DD.');
    return;
  }

  const date = new Date(`${dateString} 00:00:00`);

  // Checa se a data é válida
  if (isNaN(date.getTime())) {
    console.error('Data inválida.');
    return;
  }

  return date;
}

const converterDias = (objeto: Partial<WeekDays>) => {
  const dias: {
    [key: string]: string
  } = {
    dom: "domingos",
    seg: "segundas",
    ter: "terças",
    qua: "quartas",
    qui: "quintas",
    sex: "sextas",
    sab: "sábados",
  };

  const diasTexto = [];

  for (const [chave, valor] of Object.entries(objeto)) {
    const dia = dias[chave];
    if (valor === 1 && dia) {
      diasTexto.push(dia);
    }
  }

  return diasTexto.join(', ');
}

const parseQualitativePlanToWeekdaysString = (plan: QualitativeEatingPlan) => {
  const dias: {
    [key: string]: string
  } = {
    sunday: "domingos",
    monday: "segundas",
    tuesday: "terças",
    wednesday: "quartas",
    thursday: "quintas",
    friday: "sextas",
    saturday: "sábados",
  };

  const diasTexto = [];

  for (const [chave, valor] of Object.entries(plan)) {
    const dia = dias[chave];
    if (valor === 1 && dia) {
      diasTexto.push(dia);
    }
  }

  return diasTexto.join(', ');
}

export { formatDateToYYYYMMDD, isCurrentDateBetween, convertToDate, converterDias, parseQualitativePlanToWeekdaysString };