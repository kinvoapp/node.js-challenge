"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilter = void 0;
const helper_1 = require("../../../utils/helper");
const getAllFilter = (req) => {
    const searchParameter = {};
    if (req.query.date) {
        const startAt = (0, helper_1.getDateFormated)(String(req.query.date).split(',')[0]);
        const startEnd = (0, helper_1.getDateFormated)(String(req.query.date).split(',')[1]);
        searchParameter.date = {
            $gte: startAt,
            $lt: (0, helper_1.addTime)(startEnd, 20, 59, 59, 59),
        };
    }
    return searchParameter;
};
exports.getAllFilter = getAllFilter;
