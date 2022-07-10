require("dotenv").config();
import mongoose from "mongoose";

function connectToDataBase() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log("Error in DB connection Mongo", err.message);
    });

  const db = mongoose.connection;
  db.on("error", (err) => console.error(err));
  db.once("open", () => console.log("connect to mongoDB"));
}

export default connectToDataBase;
