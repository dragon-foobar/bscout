import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import RedditProvider from "next-auth/providers/reddit";
import { saveUserOnSignUp } from "@/lib/api/user";

export const nextauthOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID ?? "",
      clientSecret: process.env.REDDIT_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const { name: username } = token;
      if (username) {
        return { ...session, username };
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const userName = user.name ?? "";
        const userContact = user.email ?? "";
        try {
          await saveUserOnSignUp(userName, userContact);
        } catch (error) {
          console.error("Error saving user on signup:", error);
          throw new Error("SIGNUP_ERROR");
        }
      }
      if (user) {
        return { ...token, username: user?.username };
      }
      return token;
    },
  },
};
