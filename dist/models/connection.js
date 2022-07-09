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
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { HOST, DB_NAME, USER_CLUSTER, PASSWORD_CLUSTER, DEVELOPMENT } = process.env;
const CLUSTER = `mongodb+srv://${USER_CLUSTER}:${PASSWORD_CLUSTER}@node-challenge.axsni.mongodb.net/?retryWrites=true&w=majority`;
const URI = DEVELOPMENT === "true"
    ? `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`
    : CLUSTER;
console.log("URI: ", URI);
exports.connection = () => __awaiter(void 0, void 0, void 0, function* () {
    return MongoClient.connect(URI)
        .then((conn) => conn.db(DB_NAME))
        .catch((error) => {
        console.log(error);
        process.exit();
    });
});
exports.disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = MongoClient.connect(URI);
    (yield conn).close();
});
