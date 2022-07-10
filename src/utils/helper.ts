export const getDecimal = (value: any) => {
  if (value) {
    value = parseFloat(String(value));
  }

  return value;
}