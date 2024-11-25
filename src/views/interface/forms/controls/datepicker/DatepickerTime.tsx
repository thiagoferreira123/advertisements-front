import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatepickerTime = (props: ReactDatePickerProps) => {
  return <DatePicker className="form-control" timeFormat="HH:mm" showTimeSelect showTimeSelectOnly timeIntervals={15} {...props} autoComplete="off" />;
};

export default DatepickerTime;
