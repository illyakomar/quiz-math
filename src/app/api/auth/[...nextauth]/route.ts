import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import User from '@/database/models/User';
import connect from '@/database/connection';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        firstName: { type: 'text' },
        lastName: { type: 'text' },
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Error');

        await connect();

        try {
          const user = await User.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error('User not found!');
          }

          const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Wrong Credentials!');
          }

          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      console.log(url);
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        //console.log(url);
        return url;
      }

      return baseUrl;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
