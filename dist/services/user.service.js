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
exports.deleteUserService = exports.updateUserService = exports.getUsersService = exports.userCreateService = void 0;
const user_1 = require("../interfaces/user");
const users_models_1 = require("../models/users.models");
const userCreateService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user_1.users.length + 1;
    const userId = yield (0, users_models_1.modelUserCreate)(Object.assign(Object.assign({}, user), { id }));
    // users.push({ ...user, id });
    return userId;
});
exports.userCreateService = userCreateService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.users;
});
exports.getUsersService = getUsersService;
const updateUserService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const indexUser = user_1.users.findIndex((user) => user.id === Number(id));
    let response = {};
    if (indexUser >= 0) {
        user_1.users.splice(indexUser, 1);
        response = { deleted: `Usuário de id ${id} deletado com sucesso.` };
    }
    return response;
});
exports.deleteUserService = deleteUserService;
