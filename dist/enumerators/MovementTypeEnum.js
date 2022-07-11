"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMovementType = exports.MovementTypeMap = exports.MovementTypeEnum = void 0;
var MovementTypeEnum;
(function (MovementTypeEnum) {
    MovementTypeEnum[MovementTypeEnum["REVENUES"] = 1] = "REVENUES";
    MovementTypeEnum[MovementTypeEnum["EXPENSES"] = 2] = "EXPENSES";
})(MovementTypeEnum = exports.MovementTypeEnum || (exports.MovementTypeEnum = {}));
exports.MovementTypeMap = [MovementTypeEnum.REVENUES, MovementTypeEnum.EXPENSES];
const isMovementType = (value) => exports.MovementTypeMap.includes(value);
exports.isMovementType = isMovementType;
