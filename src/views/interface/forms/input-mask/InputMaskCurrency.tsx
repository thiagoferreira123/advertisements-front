import React from 'react';
import { NumericFormat } from 'react-number-format';

export const CurrencyComma = () => {
  return < NumericFormat className="form-control" thousandSeparator="," decimalSeparator="." prefix="$" />;
};

export const CurrencyDot = () => {
  return < NumericFormat className="form-control" thousandSeparator="." decimalSeparator="," prefix="¥" />;
};

export const CurrencyGrouping = () => {
  return < NumericFormat className="form-control" thousandSeparator thousandsGroupStyle="lakh" prefix="₹" />;
};
