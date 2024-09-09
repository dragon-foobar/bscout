"use server";

import { pusherServer } from "@/lib/pusher";

export const sendMessage = async (message: string) => {
  try {
    // TODO store the message
    // 1
    await pusherServer.trigger("chat-app", "upcoming-message", {
      message,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
