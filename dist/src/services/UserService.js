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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const UserRepository_1 = require("../database/repositories/UserRepository");
const AppError_1 = require("../utils/errors/AppError");
class UserService {
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield UserRepository_1.UserRepository.selectOne({ email });
            return response;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield UserRepository_1.UserRepository.selectOne({ _id: id });
            if (!response) {
                throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Nenhum usuário foi encontrado!');
            }
            return response;
        });
    }
}
exports.UserService = UserService;
