"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.express = (0, express_1.default)();
        this.listen();
        this.routes();
    }
    getApp() {
        return this.express;
    }
    routes() {
        this.express.get('/', (req, res) => {
            return res.status(200).json({ message: 'Olá!' });
        });
    }
    listen() {
        this.express.listen(3000, () => console.log('Servidor rodando na porta 3000...'));
    }
}
exports.App = App;
