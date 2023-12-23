import { createRouteParamsHandler } from '@/utils/http/handler/helpers';
import { NextRequestBodyType } from '@/utils/middleware/classes/next-request-body-type';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { updateTestSchema } from '@/utils/http/shemas/test/test-update.schema';
import { UpdateTestSchemaType } from '@/utils/http/shemas/test/types';
import TestService from '@/database/test/test.service';

const parseBodyUpdate = parseBody(updateTestSchema);

export const PATCH = createRouteParamsHandler(
  [protectWithAuth, parseBodyUpdate, connectDb],
  async (
    request: NextRequestBodyType<Partial<UpdateTestSchemaType>>,
    { params }: { params: { id: string } },
  ) => {
    return TestService.updateOne({ _id: params.id }, request.parsedBody);
  },
);

export const DELETE = createRouteParamsHandler(
  [protectWithAuth, connectDb],
  async (_request: NextRequestBodyType, { params }: { params: { id: string } }) => {
    return TestService.deleteOne({ _id: params.id });
  },
);
