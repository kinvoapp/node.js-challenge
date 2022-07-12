import * as Yup from 'yup';

export const transactionCreateSchema = Yup.object({
  description: Yup.string().required('A descrição é obrigatória.'),
  type: Yup.string().test(
    'test-invalid-type',
    'O tipo da operação é inválido.',
    (type) => type === 'credit' || type === 'debit'
  ),
  value: Yup.number()
    .required('A senha é obrigatória.')
    .positive('Insira com um valor positivo.'),
});

export const transactionUpdateSchema = Yup.object({
  description: Yup.string().required('A descrição é obrigatória.'),
});
