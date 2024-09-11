import type { NextApiRequest, NextApiResponse } from "next";
import { searchUser, updateUser } from "lib/api/user";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getMdxSource } from "lib/api/user";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/lib/pusher";
import message from "@/components/forum/Message";
import { getMessages, saveMessage } from "@/lib/api/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    return handlePost(req, res);
  } else if (req.method == "GET") {
    return handleGet(res);
  } else {
    return res.status(400).json({ error: "BAD REQUEST" });
  }
}

async function handleGet(res: NextApiResponse) {
  try {
    return await getMessages();
  } catch (error: any) {
    return res.status(500).json({ error });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.username) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const { message } = req.body;
  try {
    await pusherServer.trigger("bscout", "upcoming-message", {
      message: `${session.username}: ${message}`,
    });
    await saveMessage(session.username, message);

    return res.status(200);
  } catch (error: any) {
    return res.status(500).json({ error });
  }
}
