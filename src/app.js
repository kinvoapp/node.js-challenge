import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";

class App {
  constructor() {
    dotenv.config();
    this.server = express();

    mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@kinvo.qjizd.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
