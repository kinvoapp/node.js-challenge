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
exports.AuthService = void 0;
const UserService_1 = require("./UserService");
const bcryptjs_1 = require("bcryptjs");
const http_status_1 = __importDefault(require("http-status"));
const UserRepository_1 = require("../database/repositories/UserRepository");
const AppError_1 = require("../utils/errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../utils/constants");
class AuthService {
    static register({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield UserService_1.UserService.getByEmail(email);
            if (userFound) {
                throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Já existe um usuário cadastrado com esse email!');
            }
            password = yield (0, bcryptjs_1.hash)(password, 10);
            const response = yield UserRepository_1.UserRepository.create({ email, password });
            response.password = undefined;
            return response;
        });
    }
    static login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.UserService.getByEmail(email);
            if (!user) {
                throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Login inválido!');
            }
            const passwordValid = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordValid) {
                throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Login inválido!');
            }
            const { key, expiresIn } = constants_1.constants.jwt;
            const token = (0, jsonwebtoken_1.sign)({ userId: String(user._id) }, key, { expiresIn });
            return { token };
        });
    }
}
exports.AuthService = AuthService;
