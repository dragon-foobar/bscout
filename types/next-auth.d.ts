import NextAuth, { User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    username?: string;
  }

  interface User {
    username?: string;
  }
}
