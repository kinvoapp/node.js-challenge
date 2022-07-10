import ITransaction from "../interfaces/ITransaction";

export const calculate = (result: ITransaction[]) => {
  return result.reduce((value, acc) => {
    return value + acc.value;
  }, 0);
};
