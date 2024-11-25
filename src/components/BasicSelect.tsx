import { useEffect, useState } from 'react';
import Select from 'react-select';

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange: (_e: Option) => void;
}

const BasicSelect = ({ options, value: propValue, placeholder = '', disabled = false, className, onChange }: SelectProps) => {
  const [value, setValue] = useState<Option | null>();

  const handleChange = (selectedOption: Option | null) => {
    setValue(selectedOption);
    onChange(selectedOption!);
  };

  useEffect(() => {
    setValue(options.find((option) => option.value === propValue));
  }, [propValue, options]);

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      isDisabled={disabled}
      className={disabled ? 'opacity-50 ' + className : className}
    />
  );
};

export default BasicSelect;
