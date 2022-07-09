const express = require("express");

const routes = require("./routes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(routes);

const development = process.env.DEVELOPMENT === "true";

app.listen(process.env.PORT, () => {
  const URL = development
    ? `Server running on http://${process.env.HOST}:${process.env.PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

  return URL;
});

module.exports = app;
