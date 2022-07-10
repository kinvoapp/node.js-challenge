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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const Database_1 = require("./database/Database");
const movementController_1 = __importDefault(require("./routes/controllers/movementController"));
class App {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.express = (0, express_1.default)();
        this.database();
        this.middleware();
        this.routes();
        this.listen();
    }
    getApp() {
        return this.express;
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Database_1.Database.connect();
        });
    }
    middleware() {
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use(express_1.default.json());
    }
    routes() {
        this.express.use('/api/movement', movementController_1.default);
    }
    listen() {
        this.express.listen(this.PORT, () => console.log('Servidor rodando na porta 3000...'));
    }
}
exports.App = App;
