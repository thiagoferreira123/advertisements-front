import React from 'react';
import { NumericFormat } from 'react-number-format';

export const InputMaskBasicDigits = () => {
  return < NumericFormat className="form-control" mask="" format="#######" allowemptyformatting="true" />;
};

export const InputMaskBasicValue = () => {
  const MAX_VAL = 9999999999;
  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= MAX_VAL) return true;
    return false;
  };
  return < NumericFormat className="form-control" allowemptyformatting="true" isAllowed={withValueCap} />;
};
