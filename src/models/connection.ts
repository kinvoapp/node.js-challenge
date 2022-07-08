import { MongoClient } from "mongodb";
require("dotenv").config();

const { DEVELOPMENT, HOST, DB_NAME, MONGODB_URL } = process.env;

const MONGO_URL =
  DEVELOPMENT === "true"
    ? `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`
    : MONGODB_URL;
console.log(MONGO_URL);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () =>
  MongoClient.connect(MONGO_URL, options)
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.log(error.message);

      process.exit();
    });

export default connection;
