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
exports.disconnect = exports.connection = void 0;
const mongodb_1 = require("mongodb");
require("dotenv").config();
const { DEVELOPMENT, HOST, DB_NAME, MONGODB_URL } = process.env;
const MONGO_URL = DEVELOPMENT === "true"
    ? `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`
    : MONGODB_URL;
console.log(MONGO_URL);
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    return mongodb_1.MongoClient.connect(MONGO_URL)
        .then((conn) => conn.db(DB_NAME))
        .catch((error) => {
        console.log(error.message);
        process.exit();
    });
});
exports.connection = connection;
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = mongodb_1.MongoClient.connect(MONGO_URL);
    (yield conn).close();
});
exports.disconnect = disconnect;
