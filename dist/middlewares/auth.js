"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const secret = fs.readFileSync(path.resolve(__dirname, "../../jwt.evaluation.key"), "utf8");
exports.generateToken = (user) => {
    const jwtConfig = {
        expiresIn: "7d",
        algorithm: "HS256",
    };
    const token = jwt.sign({ user }, secret, jwtConfig);
    return token;
};
exports.validationToken = (req, _res, next) => {
    try {
        const { authorization } = req.headers;
        const { user } = jwt.verify(authorization, secret);
        next(user);
    }
    catch ({ message }) {
        console.error(message);
        next(message);
    }
};
