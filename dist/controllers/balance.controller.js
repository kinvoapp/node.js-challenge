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
const { getBalanceService } = require("../services/balance.service");
exports.getBalance = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let balance;
    try {
        balance = yield getBalanceService();
    }
    catch (error) {
        return res.status(500);
    }
    return balance.code
        ? res.status(balance.code).json(balance.message)
        : res.status(200).json(balance);
});
