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
const { deleteUserService, getUsersService, updateUserService, userCreateService, } = require("../services/user.service");
exports.userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield userCreateService(req.body);
        return res.status(201).json({ id });
    }
    catch (error) {
        return res.status(500);
    }
});
exports.getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield getUsersService();
    }
    catch (error) {
        return res.status(500);
    }
    return res.status(200).json(users);
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const update = yield updateUserService(id, req.body);
        return res.status(200).json(update);
    }
    catch (error) {
        return res.status(500);
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const deleted = yield deleteUserService(id);
        return res.status(200).json(deleted);
    }
    catch (error) {
        return res.status(500);
    }
});
