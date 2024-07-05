import "dotenv";
import { MongoClient } from "mongodb";

let mongoClient: MongoClient;

export const getMongoClient = () => {
  const mongoUrl = process.env.MONGODB_URI ?? "mongodb://localhost:27017/test";

  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUrl, { ignoreUndefined: true });
  }

  return mongoClient;
};

export const getUsersCollection = async () => {
  const client = getMongoClient();
  return client.db(process.env.DB_NAME ?? "test").collection("users");
};
