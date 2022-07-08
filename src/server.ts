import express, { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 8080;

// const routes = require("./src/routes");
import connectToDataBase from "./database";
// const cors = require("cors");
// const product = require("./api/product");
connectToDataBase();
// app.use(cors());
// app.use("/api/product", product);
// app.use(routes);

app.listen(PORT, () => {
  console.log(`Backend started at http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
