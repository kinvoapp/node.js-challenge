"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
class Database {
    static connect() {
        const databaseUrl = constants_1.constants.database.url;
        mongoose_1.default.connect(databaseUrl || '').then(() => {
            console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
        }).catch((err) => {
            console.log(`Erro ao tentar se conectar com o Banco de Dados: ${err}`);
        });
    }
}
exports.Database = Database;
