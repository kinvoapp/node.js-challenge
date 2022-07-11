"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimal = exports.addTime = exports.getDateFormated = exports.controllerPagination = void 0;
const controllerPagination = (req) => {
    return {
        offset: Number(req.query.offset) || 0,
        limit: Number(req.query.limit) || 0,
    };
};
exports.controllerPagination = controllerPagination;
const getDateFormated = (date) => new Date(`${Number(date.split('/')[2])}-${Number(date.split('/')[1])}-${Number(date.split('/')[0])}`);
exports.getDateFormated = getDateFormated;
const addTime = (date, hours, minutes, seconds, milliseconds) => {
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(milliseconds);
    return date;
};
exports.addTime = addTime;
const getDecimal = (value) => parseFloat(String(value));
exports.getDecimal = getDecimal;
