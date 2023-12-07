import { nextauthOptions } from "@/lib/nextauthOptions";
import type { NextAuthOptions } from 'next-auth'
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {...nextauthOptions}

export default NextAuth(authOptions);