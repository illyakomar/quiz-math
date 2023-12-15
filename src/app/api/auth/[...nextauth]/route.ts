import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { UserDocument } from '@/database/user/user.schema';
import EnvService from '@/env/env.service';
import { EnvEnum } from '@/env/env.enum';
import { UnauthorizedException } from '@/utils/http/exceptions/exceptions/unathorized.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';
import { isHttpException } from '@/utils/http/exceptions/helpers';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import UserService from '@/database/user/user.service';

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
          if (!credentials) {
            throw new UnauthorizedException(HttpExceptionMessageEnum.AUTH_UNEXPECTED_ERROR);
          }

          await connectDb();

          const user = await UserService.selectOne(
            { email: credentials?.email },
            { asDocument: true },
          );
          if (!user) {
            throw new UnauthorizedException(HttpExceptionMessageEnum.AUTH_INCORRECT_CREDENTIALS);
          }

          const isPasswordCorrect = await user.comparePassword(credentials.password);
          if (!isPasswordCorrect) {
            throw new UnauthorizedException(HttpExceptionMessageEnum.AUTH_INCORRECT_CREDENTIALS);
          }

          return user as any;
        } catch (error: any) {
          const message = isHttpException(error)
            ? error.message
            : HttpExceptionMessageEnum.AUTH_UNEXPECTED_ERROR;
          throw new Error(Array.isArray(message) ? message.join(', ') : message);
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
