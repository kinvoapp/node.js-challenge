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
exports.getUsers = exports.userCreate = void 0;
const user_service_1 = require("../services/user.service");
const userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield (0, user_service_1.userCreateService)(req.body);
        return res.status(201).json({ id });
    }
    catch (error) {
        return res.status(500);
    }
});
exports.userCreate = userCreate;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield (0, user_service_1.getUsersService)();
    }
    catch (error) {
        return res.status(500);
    }
    return res.status(200).json(users);
});
exports.getUsers = getUsers;
