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
const schemas = require("./schemas");
const userModel = require("../models/users.models");
const { generateToken } = require("../middlewares/auth");
exports.loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = schemas.loginSchema.validate({ email, password });
    if (error)
        return { code: 400, message: error.message };
    const user = yield userModel.find({
        email,
    });
    return user.length > 0
        ? generateToken({ email: user[0].email })
        : { code: 400, message: "User no register" };
});
