import React, { useState } from 'react';
import Select from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  onChange: (value: Option | null) => void; // Adicionando prop para callback
}

const SelectBasic = ({ options, onChange }: SelectProps) => {
  const [value, setValue] = useState<Option | null>(null);

  const handleChange = (selectedOption: Option | null) => {
    setValue(selectedOption);
    onChange(selectedOption); // Notificar o componente pai
  };

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      value={value}
      onChange={handleChange}
      placeholder="Qual o seu pais?"
    />
  );
};

export default SelectBasic;
