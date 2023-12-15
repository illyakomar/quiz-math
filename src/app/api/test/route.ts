import { createRouteHandler } from '@/utils/http/handler/helpers';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { NextRequestBodyType } from '@/utils/http/exceptions/classes/next-request-body-type';
import { createTestSchema } from '@/utils/http/shemas/test/test-create.schema';
import { CreateTestSchemaType } from '@/utils/http/shemas/test/types';
import TestService from '@/database/test/test.service';

const parseBodyCreate = parseBody(createTestSchema);

export const POST = createRouteHandler(
  [protectWithAuth, parseBodyCreate, connectDb],
  async (request: NextRequestBodyType<CreateTestSchemaType>) => {
    return TestService.createOne(request.parsedBody);
  },
);
