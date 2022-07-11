"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helper_1 = require("../utils/helper");
const MovementSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: false,
        maxlength: 200,
    },
    formOfPayment: {
        type: Number,
        required: false,
    },
    type: {
        type: Number,
        required: true,
    },
    value: {
        type: mongoose_1.Schema.Types.Decimal128,
        get: helper_1.getDecimal,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, { toJSON: { getters: true }, timestamps: true });
exports.default = (0, mongoose_1.model)('Movement', MovementSchema);
