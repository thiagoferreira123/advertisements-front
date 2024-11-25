import React from 'react';
import { NumericFormat } from 'react-number-format';

export const InputMaskPhoneInternational = () => {
  return < NumericFormat format="+49 (###) ###-####" mask="_" className="form-control" allowemptyformatting="true" />;
};

export const InputMaskPhoneDomestic = () => {
  return < NumericFormat format="(###) ###-####" mask="_" className="form-control" allowemptyformatting="true" />;
};
