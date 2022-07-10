"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormOfPayment = exports.FormOfPaymentMap = exports.FormOfPaymentEnum = void 0;
var FormOfPaymentEnum;
(function (FormOfPaymentEnum) {
    FormOfPaymentEnum[FormOfPaymentEnum["PIX"] = 1] = "PIX";
    FormOfPaymentEnum[FormOfPaymentEnum["CREDIT_CARD"] = 2] = "CREDIT_CARD";
    FormOfPaymentEnum[FormOfPaymentEnum["DEBIT_CARD"] = 3] = "DEBIT_CARD";
    FormOfPaymentEnum[FormOfPaymentEnum["MONEY"] = 4] = "MONEY";
    FormOfPaymentEnum[FormOfPaymentEnum["TRANSFER"] = 5] = "TRANSFER";
})(FormOfPaymentEnum = exports.FormOfPaymentEnum || (exports.FormOfPaymentEnum = {}));
exports.FormOfPaymentMap = [
    FormOfPaymentEnum.PIX,
    FormOfPaymentEnum.CREDIT_CARD,
    FormOfPaymentEnum.DEBIT_CARD,
    FormOfPaymentEnum.MONEY,
    FormOfPaymentEnum.TRANSFER,
];
const isFormOfPayment = (value) => exports.FormOfPaymentMap.includes(value);
exports.isFormOfPayment = isFormOfPayment;
