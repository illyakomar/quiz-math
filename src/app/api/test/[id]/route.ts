import Test from '@/database/test-template/schemas/test-template.schema';
import { createRouteParamsHandler } from '@/utils/http/handler/helpers';
import { NextRequestBodyType } from '@/utils/http/exceptions/classes/next-request-body-type';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { updateTestSchema } from '@/utils/http/shemas/test/test-update.schema';
import { UpdateTestSchemaType } from '@/utils/http/shemas/test/types';

const parseBodyUpdate = parseBody(updateTestSchema);

export const PATCH = createRouteParamsHandler(
  [protectWithAuth, parseBodyUpdate, connectDb],
  async (
    request: NextRequestBodyType<UpdateTestSchemaType>,
    { params }: { params: { id: string } },
  ) => {
    return Test.findOneAndUpdate({ _id: params.id }, request.parsedBody, {
      new: true,
    });
  },
);

export const DELETE = createRouteParamsHandler(
  [protectWithAuth, connectDb],
  async (_request: NextRequestBodyType, { params }: { params: { id: string } }) => {
    return Test.findOneAndDelete({ _id: params.id });
  },
);
