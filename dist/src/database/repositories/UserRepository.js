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
exports.UserRepository = void 0;
const http_status_1 = __importDefault(require("http-status"));
const User_1 = __importDefault(require("../../entities/User"));
const AppError_1 = require("../../utils/errors/AppError");
class UserRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = null;
            try {
                response = yield User_1.default.create(data);
            }
            catch (err) {
                throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, `Error: ${err}`);
            }
            return response;
        });
    }
    static selectOne(where) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = null;
            try {
                response = yield User_1.default.findOne(where);
            }
            catch (err) {
                throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, `Error: ${err}`);
            }
            return response;
        });
    }
}
exports.UserRepository = UserRepository;
