import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '../../../src/utils/db';
import db from '@/utils/database';
import { isPasswordValid } from '@/utils/hash';

interface SessionUser {
  id: number;
  name: string;
  email: string;
  reset: boolean;
  accessToken?: string;
}

export default NextAuth({
  pages: {
    signIn: '/dashboards'
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      //@ts-ignore
      async authorize(credentials: any) {
        await db.connect();
        console.log(credentials);
        const user = await getUser(credentials.email);
        console.log('user', user);
        // Check if user exists
        if (!user) {
          return 'user error';
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password
        );
        console.log('isPasswordMatch', isPasswordMatch);
        if (!isPasswordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          reset: user.reset
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token, ...rest }) {
      console.log('****** session', rest);
      if (token.user) {
        session.user = token.user as SessionUser;
        return session;
      }
      return null;
    }
  },
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 Days
  }
});
