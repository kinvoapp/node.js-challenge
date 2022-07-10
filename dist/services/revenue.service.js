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
const { revenueModel } = require("../models/index.models");
const { revenueSchema } = require("./schemas");
exports.revenueCreateService = (revenue) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = revenueSchema.validate(revenue);
    if (error)
        return { code: 400, message: error.message };
    const { title, value, date } = yield revenueModel.create(revenue);
    return { title, value, date };
});
exports.revenueGetAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenues = yield revenueModel.find();
    return revenues;
});
exports.revenueGetByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const revenues = yield revenueModel.find({ id });
    return revenues;
});
exports.revenueSrcForDatesService = (initialDate, finalDate) => __awaiter(void 0, void 0, void 0, function* () {
    const revenues = yield revenueModel.find({
        date: {
            $gte: initialDate,
            $lte: finalDate,
        },
    });
    return revenues;
});
