const { MongoClient } = require("mongodb");

require("dotenv").config();

const { HOST, DB_NAME } = process.env;

const MONGO_URL = `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`;

exports.connection = async () =>
  MongoClient.connect(MONGO_URL)
    .then((conn: any) => conn.db(DB_NAME))
    .catch((error: any) => {
      console.log(error);

      process.exit();
    });

exports.disconnect = async () => {
  const conn = MongoClient.connect(MONGO_URL);

  (await conn).close();
};
