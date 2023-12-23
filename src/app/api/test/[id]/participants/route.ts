import { NextRequestBodyType } from '@/utils/middleware/classes/next-request-body-type';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { updateTestParticipantsSchema } from '@/utils/http/shemas/test/test-participant-create.schema';
import { UpdateTestParticipantsSchemaType } from '@/utils/http/shemas/test/types';
import { createRouteParamsHandler } from '@/utils/http/handler/helpers';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import TestService from '@/database/test/test.service';

const parseBodyUpdate = parseBody(updateTestParticipantsSchema);

export const PATCH = createRouteParamsHandler(
  [parseBodyUpdate, connectDb],
  async (
    request: NextRequestBodyType<UpdateTestParticipantsSchemaType>,
    { params }: { params: { id: string } },
  ) => {
    return TestService.updateOne(
      { _id: params.id },
      { $push: { participants: { $each: request.parsedBody.participants } } },
    );
  },
);
