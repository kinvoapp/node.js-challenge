const { MongoClient } = require("mongodb");

require("dotenv").config();

const { HOST, DB_NAME, USER_CLUSTER, PASSWORD_CLUSTER, DEVELOPMENT } =
  process.env;

const CLUSTER = `mongodb+srv://${USER_CLUSTER}:${PASSWORD_CLUSTER}@node-challenge.axsni.mongodb.net/?retryWrites=true&w=majority`;
const URI =
  DEVELOPMENT === "true"
    ? `mongodb://${HOST || "mongodb"}:27017/${DB_NAME}`
    : CLUSTER;

console.log("URI: ", URI);

exports.connection = async () =>
  MongoClient.connect(URI)
    .then((conn: any) => conn.db(DB_NAME))
    .catch((error: any) => {
      console.log(error);

      process.exit();
    });

exports.disconnect = async () => {
  const conn = MongoClient.connect(URI);

  (await conn).close();
};
