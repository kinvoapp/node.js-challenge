const { connection } = require("./connection");

export const modelUserCreate = async (user: object) => {
  const db = await connection();

  const { insertedId } = await db.collection("users").insertOne(user);
  console.log(insertedId);

  return insertedId;
};
