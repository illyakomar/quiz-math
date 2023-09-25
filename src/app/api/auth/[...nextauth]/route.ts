import { FilterQuery } from 'mongoose';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import User, { UserDocument } from '@/database/models/User';
import connect from '@/database/connection';
import EnvService from '@/env/service';
import { EnvEnum } from '@/env/enum';

export const authOptions: AuthOptions = {
  secret: EnvService.get(EnvEnum.NEXTAUTH_SECRET),
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
        if (!credentials) throw new Error('Сталася помилка!');

        await connect();

        try {
          const user = await User.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error('Неправильний email або пароль!');
          }

          const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Неправильний email або пароль!');
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userDocument = user as UserDocument;
        token.id = userDocument.id;
        token.firstName = userDocument.firstName;
        token.lastName = userDocument.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
      };
      return session;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: EnvService.get<string>(EnvEnum.NODE) === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
