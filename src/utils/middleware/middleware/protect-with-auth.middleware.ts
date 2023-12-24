import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UnauthorizedException } from '@/utils/http/exceptions/exceptions/unathorized.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-message.enum';

export const protectWithAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UnauthorizedException(HttpExceptionMessageEnum.AUTH_UNAUTHORIZED);
};
