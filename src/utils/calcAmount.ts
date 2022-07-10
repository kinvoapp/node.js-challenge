export const calculate = (data: Array<any>) => {
  return data.reduce((value, transaction) => {
    return value + transaction.value;
  }, 0);
};
