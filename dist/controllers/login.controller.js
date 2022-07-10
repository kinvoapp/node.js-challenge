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
const { loginService } = require("../services/login.service");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let login;
    const { email, password } = req.body;
    try {
        login = yield loginService(email, password);
    }
    catch (error) {
        return res.status(500);
    }
    return login.code
        ? res.status(login.code).json({ message: login.message })
        : res.status(200).json({ token: login });
});
