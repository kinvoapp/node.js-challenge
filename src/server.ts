const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { HOST, DB_NAME, USER_CLUSTER, PASSWORD_CLUSTER, DEVELOPMENT } =
  process.env;

const CLUSTER = `mongodb+srv://${USER_CLUSTER}:${PASSWORD_CLUSTER}@node-challenge.axsni.mongodb.net/?retryWrites=true&w=majority`;

const URI =
  DEVELOPMENT === "true"
    ? `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`
    : CLUSTER;

mongoose.Promise = global.Promise;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((error: any) => {
    console.log("Could not connect" + error);
    process.exit();
  });

const routes = require("./routes");

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
