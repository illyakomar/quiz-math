import { getServerSession } from 'next-auth/next';

import { UnauthorizedException } from '@/utils/http/exceptions/exceptions/unathorized.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';

export const protectWithAuth = async () => {
  const session = await getServerSession();
  if (!session) {
    throw new UnauthorizedException(HttpExceptionMessageEnum.AUTH_UNAUTHORIZED);
  }
};
