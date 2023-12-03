import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import connect from '@/database/config';
import { UserDocument } from '@/database/schemas/user.schema';
import EnvService from '@/env/env.service';
import { EnvEnum } from '@/env/env.enum';
import User from '@/database/schemas/user.schema';

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
        try {
          if (!credentials) throw new Error('Сталася помилка!');

          await connect();

          const user = await User.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error('Неправильний email або пароль!');
          }

          const isPasswordCorrect = await user.comparePassword(credentials.password);
          if (!isPasswordCorrect) {
            throw new Error('Неправильний email або пароль!');
          }

          return user as any;
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
  debug: EnvService.get<string>(EnvEnum.NODE_ENV) === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
