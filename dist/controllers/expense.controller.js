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
const { expenseCreateService, expenseGetAllService, expenseGetByIdService, expenseSrcForDatesService, expenseUpdateService, expenseDeleteService, } = require("../services/expense.service");
exports.expenseCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let expenses;
    try {
        expenses = yield expenseCreateService(req.body);
    }
    catch (error) {
        return res.status(500);
    }
    return expenses.code
        ? res.status(expenses.code).json(expenses.message)
        : res.status(201).json(expenses);
});
exports.expenseGetAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let expenses;
    try {
        expenses = yield expenseGetAllService();
    }
    catch (error) {
        return res.status(500);
    }
    return expenses.code
        ? res.status(expenses.code).json(expenses.message)
        : res.status(200).json(expenses);
});
exports.expenseGetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    let expense;
    try {
        expense = yield expenseGetByIdService(id);
    }
    catch (error) {
        return res.status(500);
    }
    return expense.code
        ? res.status(expense.code).json(expense.message)
        : res.status(200).json(expense);
});
exports.expenseSearchForDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { initialDate, finalDate } = req.body;
    let expenses;
    try {
        expenses = yield expenseSrcForDatesService(initialDate, finalDate);
    }
    catch (error) {
        return res.status(500);
    }
    return expenses.code
        ? res.status(expenses.code).json(expenses.message)
        : res.status(200).json(expenses);
});
exports.expenseUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const update = yield expenseUpdateService(id, req.body);
        return res.status(200).json(update);
    }
    catch (error) {
        return res.status(500);
    }
});
exports.expenseDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const deleted = yield expenseDeleteService(id);
        return res.status(200).json(deleted);
    }
    catch (error) {
        return res.status(500);
    }
});
