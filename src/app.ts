import express from "express";
import Routes from "./routes/finance-router";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://pedrobuenoxs:12345@dev-challenge.wwuxf6z.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Error while connecting database::", err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Routes);

export default app;
