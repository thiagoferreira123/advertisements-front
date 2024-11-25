/* eslint-disable no-unused-vars */
import { format, isBefore, parseISO, addDays, addWeeks, addMonths, isAfter, getDay } from 'date-fns';
import moment from 'moment-timezone';
import { RecurrenceType } from '../types/Events';

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const isValidHour = (value: string) => {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value);
};

export const formatDateToPrint = (date: string) => {
  const parsedDate = parseISO(date);

  return format(parsedDate, "dd-MM-yyyy 'às' HH:mm");
};

export const formatBrDate = (date: string) => {
  const parsedDate = parseISO(date);

  return format(parsedDate, 'dd/MM/yyyy');
};

export const getTimeZones = () => {
  return moment.tz.names().map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
};

export const getWeekDay = (date: Date) => {
  return getDay(date);
};

export const isBeforeThanToday = (date: Date) => {
  const today = new Date();
  return isBefore(date, today);
};

export const formatDateToApi = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatHourToApi = (date: Date) => {
  return format(date, 'HH:mm');
};

export const generateRecurrenceDates = (
  startDate: string,
  recurrenceType: RecurrenceType,
  recurrenceRepeatQuantity: number,
  argument: number | Date
): string[] => {
  const result: string[] = [];
  let currentDate = new Date(`${startDate}, 00:00:00`);
  const addFunctionMap: Record<RecurrenceType, (date: Date, amount: number) => Date> = {
    days: addDays,
    weeks: addWeeks,
    months: addMonths,
  };

  const addFunction = addFunctionMap[recurrenceType];

  const endCondition = (currentDate: Date, endDate: Date | number): boolean => {
    const endConditionDate = typeof endDate === 'number' ? addFunction(new Date(startDate), endDate) : endDate;
    return isAfter(currentDate, endConditionDate);
  };

  while (!endCondition(currentDate, argument)) {
    result.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addFunction(currentDate, recurrenceRepeatQuantity);
  }

  return result;
};

export const removeEmpty = (obj: unknown) => {
  if (!isObject(obj)) throw new Error('The parameter must be an object');

  return Object.fromEntries(Object.entries({ ...obj }).filter(([, value]) => value !== undefined && value !== null && value !== ''));
};

export const isObjectNotEmpty = (obj: unknown) => {
  if (!isObject(obj)) throw new Error('The parameter must be an object');

  return Object.keys(obj).some((key) => Boolean(obj[key]));
};

export function isObject(value: unknown): value is {[key: string]: unknown} {
  return typeof value === 'object' && value !== null;
}

