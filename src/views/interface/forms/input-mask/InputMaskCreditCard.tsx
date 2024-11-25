import React from 'react';
import { NumericFormat } from 'react-number-format';

export const InputMaskCreditCardNumber = () => {
  return < NumericFormat className="form-control" format="#### #### #### ####" mask="_" allowemptyformatting="true" />;
};

export const InputMaskCreditCardDate = () => {
  const limit = (val, max) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = `0${val}`;
    }
    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';
      } else if (val > max) {
        val = max;
      }
    }
    return val;
  };
  const cardExpiry = (val) => {
    if (val === '') {
      return '__.__';
    }
    const month = limit(val.substring(0, 2), '12');
    const date = limit(val.substring(2, 4), '31');
    return month + (date.length ? `.${date}` : '');
  };
  return < NumericFormat className="form-control" format={cardExpiry} mask="_" allowemptyformatting="true" />;
};

export const InputMaskCreditCardCVC = () => {
  return < NumericFormat className="form-control" format="###" mask="_" allowemptyformatting="true" />;
};
