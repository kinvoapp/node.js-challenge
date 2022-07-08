import express from "express";
import routes from "./routes";

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(routes);

const { PORT } = process.env;
const { HOST } = process.env;
const development = process.env.DEVELOPMENT === "true";

app.listen(PORT, () => {
  const URL = development ? `Server running on http://${HOST}:${PORT}` : "";

  return URL;
});
