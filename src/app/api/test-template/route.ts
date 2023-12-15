import { createRouteHandler } from '@/utils/http/handler/helpers';
import { NextRequestBodyType } from '@/utils/http/exceptions/classes/next-request-body-type';
import { parseBody } from '@/utils/middleware/middleware/parse-body.middleware';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { protectWithAuth } from '@/utils/middleware/middleware/protect-with-auth.middleware';
import { createTestTemplateSchema } from '@/utils/http/shemas/test-template/test-template-create.schema';
import { CreateTestTemplateSchemaType } from '@/utils/http/shemas/test-template/types';
import TestTemplateService from '@/database/test-template/test-template.service';

const parseBodyCreate = parseBody(createTestTemplateSchema);

export const POST = createRouteHandler(
  [protectWithAuth, parseBodyCreate, connectDb],
  async (request: NextRequestBodyType<CreateTestTemplateSchemaType>) => {
    return TestTemplateService.createOne(request.parsedBody);
  },
);
