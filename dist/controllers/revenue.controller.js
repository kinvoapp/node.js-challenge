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
const { revenueCreateService, revenueGetAllService, revenueGetByIdService, revenueSrcForDatesService, revenueUpdateService, revenueDeleteService, } = require("../services/revenue.service");
exports.revenueCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let revenues;
    try {
        revenues = yield revenueCreateService(req.body);
    }
    catch (error) {
        return res.status(500);
    }
    return revenues.code
        ? res.status(revenues.code).json(revenues.message)
        : res.status(201).json(revenues);
});
exports.revenueGetAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let revenues;
    try {
        revenues = yield revenueGetAllService();
    }
    catch (error) {
        return res.status(500);
    }
    return revenues.code
        ? res.status(revenues.code).json(revenues.message)
        : res.status(200).json(revenues);
});
exports.revenueGetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    let revenue;
    try {
        revenue = yield revenueGetByIdService(id);
    }
    catch (error) {
        return res.status(500);
    }
    return revenue.code
        ? res.status(revenue.code).json(revenue.message)
        : res.status(200).json(revenue);
});
exports.revenueSearchForDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { initialDate, finalDate } = req.body;
    let revenues;
    try {
        revenues = yield revenueSrcForDatesService(initialDate, finalDate);
    }
    catch (error) {
        return res.status(500);
    }
    return revenues.code
        ? res.status(revenues.code).json(revenues.message)
        : res.status(200).json(revenues);
});
exports.revenueUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const update = yield revenueUpdateService(id, req.body);
        return res.status(200).json(update);
    }
    catch (error) {
        return res.status(500);
    }
});
exports.revenueDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const deleted = yield revenueDeleteService(id);
        return res.status(200).json(deleted);
    }
    catch (error) {
        return res.status(500);
    }
});
