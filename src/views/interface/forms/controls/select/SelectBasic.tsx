/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Select from 'react-select';

interface SelectProps {
  options: any[]
}

const SelectBasic = ({options}: SelectProps) => {
  const [value, setValue] = useState();

  return <Select classNamePrefix="react-select" options={options} value={value} onChange={(e) => setValue(e)} placeholder="" />;
};

export default SelectBasic;
