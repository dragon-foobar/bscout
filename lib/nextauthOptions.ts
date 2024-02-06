// lib/nextauthOptions.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import * as argon2 from 'argon2';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import { AuthOptions } from 'next-auth';

export const nextauthOptions: AuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Email',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Natoshi Sakamoto'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection('users');
        const email = credentials?.email.toLowerCase();
        const user = await usersCollection.findOne({ email });
        if (!user) {
          throw new Error('User does not exist.');
        }

        const passwordIsValid = await argon2.verify(
          user.password,
          credentials?.password!
        );

        if (!passwordIsValid) {
          throw new Error(
            `Invalid Credentials for user ${JSON.stringify(user)}`
          );
        }

        return {
          id: user._id.toString(),
          ...user
        };
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      const { username } = token;

      if (username) {
        return { ...session, username };
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log('user in jwt', user);
      if (user) {
        return { ...token, username: user?.username };
      }
      return token;
    }
  }
};
