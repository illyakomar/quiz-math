import TestTemplate, {
  TestTemplateDocument,
} from '@/database/test-template/schemas/test-template.schema';
import { NextRequestBodyType } from '@/utils/http/exceptions/classes/next-request-body-type';
import { createRouteParamsHandler } from '@/utils/http/handler/helpers';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { updateTestTemplateSchema } from '@/utils/http/shemas/test-template/test-template-update.schema';
import { UpdateTestTemplateSchemaType } from '@/utils/http/shemas/test-template/types';

const parseBodyUpdate = parseBody(updateTestTemplateSchema);

export const PATCH = createRouteParamsHandler(
  [protectWithAuth, parseBodyUpdate, connectDb],
  async (
    request: NextRequestBodyType<UpdateTestTemplateSchemaType>,
    { params }: { params: { id: string } },
  ) => {
    return TestTemplate.findOneAndUpdate<TestTemplateDocument>(
      { _id: params.id },
      request.parsedBody,
      { new: true },
    );
  },
);

export const DELETE = createRouteParamsHandler(
  [protectWithAuth, connectDb],
  async (_id: NextRequestBodyType, { params }: { params: { id: string } }) => {
    return TestTemplate.findOneAndDelete({ _id: params.id });
  },
);
