"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const express_validator_1 = require("express-validator");
exports.authSchema = {
    register: [
        (0, express_validator_1.body)('email', 'Email inválido!').isEmail().isLength({ max: 100, min: 10 }).notEmpty(),
        (0, express_validator_1.body)('password', 'Senha inválida!').isLength({ max: 20, min: 6 }).notEmpty(),
    ],
    login: [
        (0, express_validator_1.body)('email', 'Email inválido!').isEmail().isLength({ max: 100, min: 10 }).notEmpty(),
        (0, express_validator_1.body)('password', 'Senha inválida!').isLength({ max: 20, min: 6 }).notEmpty(),
    ],
};
