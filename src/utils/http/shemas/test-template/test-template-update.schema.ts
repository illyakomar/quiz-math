import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';
import { createTestTemplateSchema } from './test-template-create.schema';

export const updateTestTemplateSchema = createTestTemplateSchema.extend({
  owner: zod
    .object({
      _id: zod.string().pipe(nonemptyString()),
    })
    .optional(),
});
