const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");

exports.connect = async () => {
  console.log(MongoMemoryServer);
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log("URI: ", uri);

  await mongoose.connect(uri);
};

exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

exports.clear = async () => {
  const collections = mongoose.connection.collections;

  for (const index in collections) {
    const collection = collections[index];

    await collection.deleteMany();
  }
};
