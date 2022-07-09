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
const userModel = require("../models/users.models");
exports.userCreateService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.find();
    const id = user.id ? user.id : users.length + 1;
    const userId = yield userModel.create(Object.assign(Object.assign({}, user), { id }));
    return userId;
});
exports.getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.find();
    return users;
});
exports.getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.find({ id });
    return user;
});
exports.updateUserService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield userModel.findOneAndUpdate(id, user);
    return updated;
});
exports.deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let deleted = yield userModel.deleteOne({ id });
    return deleted;
});
