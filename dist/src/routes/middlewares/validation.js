"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
const validation = (schema) => {
    return [
        schema,
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(http_status_1.default.BAD_REQUEST).json({ message: errors.array()[0].msg });
            }
            return next();
        }
    ];
};
exports.validation = validation;
