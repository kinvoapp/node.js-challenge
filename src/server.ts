const express = require("express");
require("dotenv").config();

const routes = require("./routes.js");

const app = express();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  return process.env.DEVELOPMENT === "true"
    ? `Server running on http://${HOST}:${PORT}`
    : "";
});
