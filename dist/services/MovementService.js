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
exports.MovementService = void 0;
const MovementTypeEnum_1 = require("./../enumerators/MovementTypeEnum");
const http_status_1 = __importDefault(require("http-status"));
const MovementRepository_1 = require("../database/repositories/MovementRepository");
const AppError_1 = require("../utils/errors/AppError");
class MovementService {
    static create({ name, description, formOfPayment, type, value, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const movementFound = yield MovementService.getByName(name);
            if (movementFound) {
                throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Já existe uma movimentação financeira com esse mesmo nome!');
            }
            const response = yield MovementRepository_1.MovementRepository.create({ name, description, formOfPayment, type, value, date });
            return response;
        });
    }
    static getAll({ where, order }) {
        return __awaiter(this, void 0, void 0, function* () {
            where = Object.assign(Object.assign({}, where), { deletedAt: null });
            const movementList = yield MovementRepository_1.MovementRepository.selectAll(where, order);
            if (!movementList.length) {
                throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Você não possui nenhuma movimentação financeira!');
            }
            const response = MovementService.calculateBalance(movementList);
            return response;
        });
    }
    static calculateBalance(movementList) {
        let balance = 0.00;
        movementList.forEach((movement) => {
            if (movement.type === MovementTypeEnum_1.MovementTypeEnum.REVENUES) {
                balance += movement.value;
            }
            else if (movement.type === MovementTypeEnum_1.MovementTypeEnum.EXPENSES) {
                balance -= movement.value;
            }
        });
        const response = {
            balance,
            movementList,
        };
        return response;
    }
    static getById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield MovementRepository_1.MovementRepository.selectOne({ _id: id, deletedAt: null }, options);
            if (!response) {
                throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Nenhuma movimentação financeira foi encontrada!');
            }
            return response;
        });
    }
    static getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield MovementRepository_1.MovementRepository.selectOne({ name, deletedAt: null }, { lean: false });
            return response;
        });
    }
    static updateById(id, { name, description, formOfPayment, type, value, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            let movement = yield MovementService.getById(id, { lean: true });
            movement = Object.assign(Object.assign({}, movement), { name,
                description,
                formOfPayment,
                type,
                value,
                date });
            const response = yield MovementRepository_1.MovementRepository.updateOne({ _id: id }, movement);
            return response;
        });
    }
    static removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield MovementService.getById(id, { lean: false });
            yield MovementRepository_1.MovementRepository.deleteOne({ _id: id });
            return { message: 'Movimentação financeira removida com sucesso!' };
        });
    }
}
exports.MovementService = MovementService;
