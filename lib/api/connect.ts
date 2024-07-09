import "dotenv";
import clientPromise from "@/lib/mongodb";

export const getUsersCollection = async () => {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME ?? "test").collection("users");
};
