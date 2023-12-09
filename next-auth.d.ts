import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserInput } from '@/database/user/user.schema';

declare module 'next-auth' {
  interface User extends UserInput {}

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
  }
}
