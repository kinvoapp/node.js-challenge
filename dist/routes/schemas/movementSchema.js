"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementSchema = void 0;
const MovementTypeEnum_1 = require("./../../enumerators/MovementTypeEnum");
const express_validator_1 = require("express-validator");
const FormOfPaymentEnum_1 = require("../../enumerators/FormOfPaymentEnum");
exports.movementSchema = {
    create: [
        (0, express_validator_1.body)('name', 'Nome inválido!').isLength({ max: 50 }).notEmpty(),
        (0, express_validator_1.body)('description', 'Descrição inválida!').isLength({ max: 200 }),
        (0, express_validator_1.body)('formOfPayment', 'Forma de pagamento inválida!').custom((value) => {
            if (value && !(0, FormOfPaymentEnum_1.isFormOfPayment)(value))
                return Promise.reject('Forma de pagamento inválida!');
            return true;
        }),
        (0, express_validator_1.body)('type', 'Tipo inválido!').custom((value) => {
            if (!(0, MovementTypeEnum_1.isMovementType)(value))
                return Promise.reject('Tipo inválido!');
            return true;
        }),
        (0, express_validator_1.body)('value', 'Valor inválido!').notEmpty().isCurrency(),
        (0, express_validator_1.body)('date', 'Data inválida!').isISO8601(),
    ],
    updateById: [
        (0, express_validator_1.param)('id', 'Id inválido').isMongoId(),
        (0, express_validator_1.body)('name', 'Nome inválido!').isLength({ max: 50 }).notEmpty(),
        (0, express_validator_1.body)('description', 'Descrição inválida!').isLength({ max: 200 }),
        (0, express_validator_1.body)('formOfPayment', 'Forma de pagamento inválida!').custom((value) => {
            if (value && !(0, FormOfPaymentEnum_1.isFormOfPayment)(value))
                return Promise.reject('Forma de pagamento inválida!');
            return true;
        }),
        (0, express_validator_1.body)('type', 'Tipo inválido!').custom((value) => {
            if (!(0, MovementTypeEnum_1.isMovementType)(value))
                return Promise.reject('Tipo inválido!');
            return true;
        }),
        (0, express_validator_1.body)('value', 'Valor inválido!').notEmpty().isCurrency(),
        (0, express_validator_1.body)('date', 'Data inválida!').isISO8601(),
    ],
    deleteById: [
        (0, express_validator_1.param)('id', 'Id inválido').isMongoId(),
    ],
};
