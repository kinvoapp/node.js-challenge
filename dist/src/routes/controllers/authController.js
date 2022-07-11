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
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const AuthService_1 = require("../../services/AuthService");
const validation_1 = require("../middlewares/validation");
const authSchema_1 = require("../schemas/authSchema");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.validation)(authSchema_1.authSchema.register), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield AuthService_1.AuthService.register(req.body);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
router.post('/login', (0, validation_1.validation)(authSchema_1.authSchema.login), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield AuthService_1.AuthService.login(req.body);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
exports.default = router;
