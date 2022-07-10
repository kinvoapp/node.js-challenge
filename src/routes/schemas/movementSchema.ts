import { isMovementType } from './../../enumerators/MovementTypeEnum';
import { body, param } from 'express-validator';
import { isFormOfPayment } from '../../enumerators/FormOfPaymentEnum';

export const movementSchema = {
  create: [
    body('name', 'Nome inválido!').isLength({ max: 50 }).notEmpty(),
    body('description', 'Descrição inválida!').isLength({ max: 200 }),
    body('formOfPayment', 'Forma de pagamento inválida!').custom((value) => {
      if (value && !isFormOfPayment(value)) return Promise.reject('Forma de pagamento inválida!');
      return true;
    }),
    body('type', 'Tipo inválido!').custom((value) => {
      if (!isMovementType(value)) return Promise.reject('Tipo inválido!');
      return true;
    }),
    body('value', 'Valor inválido!').notEmpty().isCurrency(),
    body('date', 'Data inválida!').isISO8601(),
  ],
  updateById: [
    param('id', 'Id inválido').isMongoId(),
    body('name', 'Nome inválido!').isLength({ max: 50 }).notEmpty(),
    body('description', 'Descrição inválida!').isLength({ max: 200 }),
    body('formOfPayment', 'Forma de pagamento inválida!').custom((value) => {
      if (value && !isFormOfPayment(value)) return Promise.reject('Forma de pagamento inválida!');
      return true;
    }),
    body('type', 'Tipo inválido!').custom((value) => {
      if (!isMovementType(value)) return Promise.reject('Tipo inválido!');
      return true;
    }),
    body('value', 'Valor inválido!').notEmpty().isCurrency(),
    body('date', 'Data inválida!').isISO8601(),
  ],
  deleteById: [
    param('id', 'Id inválido').isMongoId(),
  ],
}