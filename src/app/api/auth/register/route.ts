import bcrypt from 'bcrypt';

import UserService from '@/database/user/user.service';
import { createRouteHandler } from '@/utils/http/handler/helpers';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { NextRequestBodyType } from '@/utils/middleware/classes/next-request-body-type';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { createUserSchema } from '@/utils/http/shemas/user/user-create.schema';
import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';

const parseBodyCreate = parseBody(createUserSchema);

export const POST = createRouteHandler(
  [parseBodyCreate, connectDb],
  async (request: NextRequestBodyType) => {
    const { firstName, lastName, email, password } = request.parsedBody;
    const hashedPassword = await bcrypt.hash(password, 5);
    return UserService.createOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  },
);
