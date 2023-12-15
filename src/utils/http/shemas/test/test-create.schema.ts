import zod from 'zod';

import { createTestTemplateSchema } from '../test-template/test-template-create.schema';

const statusSchema = zod.enum(['ACTIVE', 'FINISHED']);

export const createTestSchema = createTestTemplateSchema.extend({
  status: statusSchema,
});
