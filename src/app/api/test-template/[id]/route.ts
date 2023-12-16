import { NextRequestBodyType } from '@/utils/middleware/classes/next-request-body-type';
import { createRouteParamsHandler } from '@/utils/http/handler/helpers';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { updateTestTemplateSchema } from '@/utils/http/shemas/test-template/test-template-update.schema';
import { UpdateTestTemplateSchemaType } from '@/utils/http/shemas/test-template/types';
import TestTemplateService from '@/database/test-template/test-template.service';

const parseBodyUpdate = parseBody(updateTestTemplateSchema);

export const PATCH = createRouteParamsHandler(
  [protectWithAuth, parseBodyUpdate, connectDb],
  async (
    request: NextRequestBodyType<UpdateTestTemplateSchemaType>,
    { params }: { params: { id: string } },
  ) => {
    return TestTemplateService.updateOne({ _id: params.id }, request.parsedBody);
  },
);

export const DELETE = createRouteParamsHandler(
  [protectWithAuth, connectDb],
  async (_id: NextRequestBodyType, { params }: { params: { id: string } }) => {
    return TestTemplateService.deleteOne({ _id: params.id });
  },
);
