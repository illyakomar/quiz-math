import zod from 'zod';

import { createTestSchema } from './test-create.schema';
import { nonemptyString } from '@/lib/validation/pipelines';

export const updateTestSchema = createTestSchema
  .extend({
    participants: zod
      .object({
        fullName: zod.string().pipe(nonemptyString()),
        correctAnswersCount: zod.number(),
      })
      .array(),
    owner: zod.string(),
  })
  .partial();
