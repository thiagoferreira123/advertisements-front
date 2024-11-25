export function parseFloatNumber(number: string | number): number {
  const parsedNumber = Number(Number(number).toFixed(1));
  return isFinite(parsedNumber) ? parsedNumber : 0;
}

export function isValidNumber(value: string | number): boolean {
  return !isNaN(Number(value)) && value !== "" && value !== Infinity;
}

export function parseStringToNumberIfValidFloat(value: string): string | number {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  if (regex.test(value)) {
    return Number(value);
  }
  return value;
}