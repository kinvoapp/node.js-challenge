"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const PORT = process.env.PORT || 3000;
const app = new App_1.App().getApp();
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}...`));
