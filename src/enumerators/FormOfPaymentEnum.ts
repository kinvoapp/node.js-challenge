export enum FormOfPaymentEnum {
  PIX = 1,
  CREDIT_CARD = 2,
  DEBIT_CARD = 3,
  MONEY = 4,
  TRANSFER = 5,
}

export const FormOfPaymentMap = [
  FormOfPaymentEnum.PIX,
  FormOfPaymentEnum.CREDIT_CARD,
  FormOfPaymentEnum.DEBIT_CARD,
  FormOfPaymentEnum.MONEY,
  FormOfPaymentEnum.TRANSFER,
];

export const isFormOfPayment = (value: any) => FormOfPaymentMap.includes(value);