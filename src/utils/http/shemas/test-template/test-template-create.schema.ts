import { nonemptyString } from '@/lib/validation/pipelines';
import zod from 'zod';

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
});
