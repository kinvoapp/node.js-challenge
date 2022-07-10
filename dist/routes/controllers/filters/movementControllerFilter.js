"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilter = void 0;
const FormOfPaymentEnum_1 = require("../../../enumerators/FormOfPaymentEnum");
const MovementTypeEnum_1 = require("../../../enumerators/MovementTypeEnum");
const helper_1 = require("../../../utils/helper");
const getAllFilter = (req) => {
    const searchParameter = {};
    if (req.query.type && (0, MovementTypeEnum_1.isMovementType)(Number(req.query.type))) {
        searchParameter.type = req.query.type;
    }
    if (req.query.formOfPayment && (0, FormOfPaymentEnum_1.isFormOfPayment)(Number(req.query.formOfPayment))) {
        searchParameter.formOfPayment = req.query.formOfPayment;
    }
    if (req.query.date) {
        const startAt = (0, helper_1.getDateFormated)(String(req.query.date).split(',')[0]);
        const startEnd = (0, helper_1.getDateFormated)(String(req.query.date).split(',')[1]);
        searchParameter.date = {
            $gte: startAt,
            $lt: (0, helper_1.addTime)(startEnd, 20, 59, 59, 59),
        };
    }
    return searchParameter;
};
exports.getAllFilter = getAllFilter;
