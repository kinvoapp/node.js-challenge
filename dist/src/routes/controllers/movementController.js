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
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const MovementService_1 = require("../../services/MovementService");
const helper_1 = require("../../utils/helper");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const validation_1 = require("../middlewares/validation");
const movementSchema_1 = require("../schemas/movementSchema");
const movementControllerFilter_1 = require("./filters/movementControllerFilter");
const router = (0, express_1.Router)();
router.post('/', authenticate_1.default, (0, validation_1.validation)(movementSchema_1.movementSchema.create), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield MovementService_1.MovementService.create(req.body);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
router.get('/', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        const searchParameter = {
            where: (0, movementControllerFilter_1.getAllFilter)(req),
            order: (0, helper_1.controllerPagination)(req),
        };
        response = yield MovementService_1.MovementService.getAll(searchParameter);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
router.get('/balance', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield MovementService_1.MovementService.calculateBalance();
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
router.put('/:id', authenticate_1.default, (0, validation_1.validation)(movementSchema_1.movementSchema.updateById), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield MovementService_1.MovementService.updateById(req.params.id, req.body);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
router.delete('/:id', authenticate_1.default, (0, validation_1.validation)(movementSchema_1.movementSchema.deleteById), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        response = yield MovementService_1.MovementService.removeById(req.params.id);
    }
    catch ({ statusCode, message }) {
        return res.status(statusCode).json({ message });
    }
    return res.status(http_status_1.default.OK).json(response);
}));
exports.default = router;
