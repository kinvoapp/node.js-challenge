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
exports.modelUserCreate = void 0;
const connection_1 = require("./connection");
const modelUserCreate = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connection_1.connection)();
    const { insertedId } = yield db.collection("users").insertOne(user);
    console.log(insertedId);
    return insertedId;
});
exports.modelUserCreate = modelUserCreate;
