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
const { revenueCreateService } = require("../services/revenue.service");
exports.revenueCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let revenue;
    try {
        revenue = yield revenueCreateService(req.body);
    }
    catch (error) {
        return res.status(500);
    }
    return revenue.code
        ? res.status(revenue.code).json(revenue.message)
        : res.status(201).json(revenue);
});
