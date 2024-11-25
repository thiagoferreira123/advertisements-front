import { ptBR } from 'date-fns/locale/pt-BR';
import React from 'react';
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

const DatePicker = (props: ReactDatePickerProps) => {
  return <ReactDatePicker locale={ptBR} {...props} autoComplete="off" />;
};

export default DatePicker;
