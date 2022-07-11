import { body } from 'express-validator';
import { isProfileType } from '../../enumerators/ProfileTypeEnum';

export const authSchema = {
  register: [
    body('email', 'Email inválido!').isEmail().isLength({ max: 100, min: 10 }).notEmpty(),
    body('password', 'Senha inválida!').isLength({ max: 20, min: 6 }).notEmpty(),
  ],
  login: [
    body('email', 'Email inválido!').isEmail().isLength({ max: 100, min: 10 }).notEmpty(),
    body('password', 'Senha inválida!').isLength({ max: 20, min: 6 }).notEmpty(),
  ],
}