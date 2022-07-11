"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
require("dotenv/config");
exports.constants = {
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        key: '$y64Uo34JOEI',
        expiresIn: '1d',
    }
};
