// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";

// Consts
const app = express();
const PORT = 3333;

// App uses
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Inicia a API
app.listen(PORT, () => {
  console.info(`API server listening on port ${PORT}`);
});
