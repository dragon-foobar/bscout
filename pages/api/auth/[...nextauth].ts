import { nextauthOptions } from "@/lib/nextauthOptions";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = { ...nextauthOptions };

const authHandler = NextAuth(authOptions);
export default async function handler(...params: any[]) {
  await authHandler(...params);
}
