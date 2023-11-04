import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const testSchema = zod.object({
  title: zod.string({ required_error: 'Введіть назву' }).pipe(nonemptyString('Введіть назву')),
  questions: zod
    .object({
      text: zod.string(),
      answers: zod
        .object({
          text: zod.string(),
          isCorrect: zod.boolean(),
        })
        .array(),
    })
    .array(),
});
