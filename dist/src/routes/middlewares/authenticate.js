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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../../services/UserService");
const constants_1 = require("../../utils/constants");
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Não autenticado!' });
        }
        try {
            const validToken = jsonwebtoken_1.default.verify(token, constants_1.constants.jwt.key);
            req.user = yield UserService_1.UserService.getById(validToken.userId);
            if (!req.user) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Não autenticado!' });
            }
            return next();
        }
        catch (err) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Não autenticado!' });
        }
    });
}
exports.default = authenticate;
