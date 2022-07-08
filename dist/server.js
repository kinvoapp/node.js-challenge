"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const routes = require("./routes.ts");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes);
const { PORT } = process.env;
const { HOST } = process.env;
const development = process.env.DEVELOPMENT === "true";
app.listen(PORT, () => {
    const URL = development ? `Server running on http://${HOST}:${PORT}` : "";
    return URL;
});
