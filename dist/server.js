"use strict";
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => {
    return process.env.DEVELOPMENT === "true"
        ? `Server running on http://${HOST}:${PORT}`
        : "";
});
