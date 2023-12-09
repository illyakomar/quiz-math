import bcrypt from 'bcrypt';

import User from '@/database/user/user.schema';
import UserService from '@/database/user/user.service';
import { createRouteHandler } from '@/utils/http/handler/helpers';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';
import { NextRequestBodyType } from '@/utils/http/exceptions/classes/next-request-body-type';

export const POST = createRouteHandler([connectDb], async (request: NextRequestBodyType) => {
  const { firstName, lastName, email, password } = request.parsedBody;

  const user = await User.findOne({ email });
  if (user) throw new ConflictException(HttpExceptionMessageEnum.USER_ALREADY_EXISTS);

  const hashedPassword = await bcrypt.hash(password, 5);
  return UserService.createOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
});
