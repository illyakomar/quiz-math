import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';
import { createTestSchema } from './test-create.schema';

export const updateTestSchema = createTestSchema.extend({
  participants: zod
    .object({
      firstName: zod.string().pipe(nonemptyString()),
      lastName: zod.string().pipe(nonemptyString()),
      correctAnswersCount: zod.number(),
    })
    .array()
    .min(1),
});
