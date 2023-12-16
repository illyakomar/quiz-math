import { Schema } from 'zod';

import { NextRequestBodyType } from '@/utils/middleware/classes/next-request-body-type';
import { BadRequestException } from '@/utils/http/exceptions/exceptions/bad-request.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';

export const parseBody = (validationSchema?: Schema) => async (request: NextRequestBodyType) => {
  await request.parseBody();
  if (!validationSchema) return;
  const result = validationSchema.safeParse(request.parsedBody);
  if (!result.success) throw new BadRequestException(HttpExceptionMessageEnum.BAD_REQUEST);
};
