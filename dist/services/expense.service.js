"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { expenseModel } = require("../models/index.models");
const { expenseSchema } = require("./schemas");
exports.expenseCreateService = (expense) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = expenseSchema.validate(expense);
    if (error)
        return { code: 400, message: error.message };
    const expenses = yield expenseModel.find();
    const newId = expense.id ? expense.id : expenses.length + 1;
    const { title, value, date, id } = yield expenseModel.create(Object.assign(Object.assign({}, expense), { id: newId }));
    return { title, value, date, id };
});
exports.expenseGetAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenseModel.find();
    return expenses;
});
exports.expenseGetByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenseModel.find({ id });
    return expenses;
});
exports.expenseSrcForDatesService = (initialDate, finalDate) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenseModel.find({
        date: {
            $gte: initialDate,
            $lte: finalDate,
        },
    });
    return expenses;
});
exports.expenseUpdateService = (id, expense) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield expenseModel.findOneAndUpdate(id, expense);
    return updated;
});
exports.expenseDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield expenseModel.deleteOne({ id });
    return deleted;
});
