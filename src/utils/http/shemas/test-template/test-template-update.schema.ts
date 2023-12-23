import zod from 'zod';

import { createTestTemplateSchema } from './test-template-create.schema';

export const updateTestTemplateSchema = createTestTemplateSchema
  .extend({
    owner: zod.string(),
  })
  .partial();
