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
const user_1 = require("../interfaces/user");
const { modelUserCreate } = require("../models/users.models");
exports.userCreateService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user_1.users.length + 1;
    const userId = yield modelUserCreate(Object.assign(Object.assign({}, user), { id }));
    return userId;
});
exports.getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.users;
});
exports.updateUserService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const indexUser = user_1.users.findIndex((user) => user.id === Number(id));
    let response = {};
    if (indexUser >= 0) {
        user_1.users[indexUser]["name"] = user["name"];
        user_1.users[indexUser]["email"] = user["email"];
        user_1.users[indexUser]["password"] = user["password"];
        response = user;
    }
    return response;
});
exports.deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const indexUser = user_1.users.findIndex((user) => user.id === Number(id));
    let response = {};
    if (indexUser >= 0) {
        user_1.users.splice(indexUser, 1);
        response = { deleted: `Usuário de id ${id} deletado com sucesso.` };
    }
    return response;
});
