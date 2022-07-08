require("dotenv").config();
import mongoose from "mongoose";

function connectToDataBase() {
  mongoose
    .connect(
      "mongodb+srv://wendreslucas:NewHorizons7@cluster0.gw8ne4d.mongodb.net/myFirstDatabase"
    )
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
