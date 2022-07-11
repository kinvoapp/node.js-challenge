import * as Yup from 'yup';
import { isCpf } from 'iscpf';

export const registerSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório.'),
  cpf: Yup.string()
    .required('O CPF é obrigatória.')
    .test('test-invalid-cpf', 'CPF Inválido.', (cpf) => isCpf(cpf!)),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 dígitos.')
    .required('A senha é obrigatória.'),
});

export const loginSchema = Yup.object({
  cpf: Yup.string()
    .test('test-invalid-cpf', 'CPF Inválido.', (cpf) => isCpf(cpf!))
    .required('O CPF é obrigatória.'),
  password: Yup.string()
    .min(6, 'Senha inválida.')
    .required('A senha é obrigatória.'),
});
