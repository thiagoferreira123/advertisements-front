import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

const DatepickerFloatingLabel = ({ label, selected, onChange }) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="form-floating" onClick={onClick} ref={ref}>
      <input className="form-control" value={value} onChange={() => {}} placeholder={label} />
      <label>{label}</label>
    </div>
  ));
  CustomInput.displayName = 'CustomInput';
  return <DatePicker className="form-control"  customInput={<CustomInput />} dateFormat="dd/MM/yyyy" locale={ptBR} selected={selected} onChange={onChange} />;
};

export default DatepickerFloatingLabel;
