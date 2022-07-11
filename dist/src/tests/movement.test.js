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
const FormOfPaymentEnum_1 = require("./../enumerators/FormOfPaymentEnum");
const http_status_1 = __importDefault(require("http-status"));
const supertest_1 = __importDefault(require("supertest"));
const App_1 = require("../App");
const MovementTypeEnum_1 = require("../enumerators/MovementTypeEnum");
describe('Movement', () => {
    it('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: 'Transferência de PIX para Adriano',
            description: 'Transferência de PIX feita para o Adriano como pagamento do sorvete',
            type: MovementTypeEnum_1.MovementTypeEnum.EXPENSES,
            formOfPayment: FormOfPaymentEnum_1.FormOfPaymentEnum.PIX,
            value: 200,
            date: '2022-07-01T05:50:20.194Z',
        };
        const response = yield (0, supertest_1.default)(new App_1.App().getApp()).post('/api/movement').send(data);
        expect(response.status).toEqual(http_status_1.default.OK);
    }));
});
