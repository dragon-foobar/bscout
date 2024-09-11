import { getMessagesCollection } from "@/lib/api/connect";

export async function saveMessage(username: string, message: string) {
  const collection = await getMessagesCollection();

  const newMessage = {
    username,
    message,
    createdAt: new Date(),
  };

  return await collection.insertOne(newMessage);
}

export async function getMessages() {
  const collection = await getMessagesCollection();

  return await collection.find({}).sort({ createdAt: -1 }).toArray();
}
