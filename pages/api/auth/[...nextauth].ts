import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import getUser from './user';
import db from '@/utils/database';
import { isPasswordValid } from '@/utils/hash';

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
          name: user.name,
          email: user.email
        };
      }
    })
  ],

  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 Days
  }
});
