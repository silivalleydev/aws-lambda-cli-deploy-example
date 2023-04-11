import mongoose from "mongoose";
import { MONGODB_URI } from "./env.mjs";
import path from "path";

export const handler = async (event, context) => {
  let body;

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    const currentDirectory = process.cwd();
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: false,
      sslCA: path.join(currentDirectory, "/rds-combined-ca-bundle.pem"),
      dbName: "test",
    });
    const db = mongoose.connection;
    const list = await db.db.collection("stores").find().toArray();
    await mongoose.disconnect();
    body = JSON.stringify(list);
  } catch (error) {
    body = JSON.stringify(error) + "error";
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};
