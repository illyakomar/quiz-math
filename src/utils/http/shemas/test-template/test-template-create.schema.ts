import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const createTestTemplateSchema = zod.object({
  title: zod.string().pipe(nonemptyString()),
  color: zod.string().pipe(nonemptyString()),
  questions: zod
    .object({
      text: zod.string().pipe(nonemptyString()),
      answers: zod
        .object({
          text: zod.string().pipe(nonemptyString()),
          isCorrect: zod.boolean(),
        })
        .array()
        .min(2),
    })
    .array()
    .min(1),
  owner: zod.string().pipe(nonemptyString()),
});
