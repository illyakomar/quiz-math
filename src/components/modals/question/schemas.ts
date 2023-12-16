import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const questionSchema = zod
  .object({
    text: zod
      .string({ required_error: 'Введіть текст питання' })
      .pipe(nonemptyString('Введіть текст питання')),
    answers: zod
      .object({
        text: zod
          .string({ required_error: 'Введіть текст відповіді' })
          .pipe(nonemptyString('Введіть текст відповіді')),
        isCorrect: zod.boolean(),
      })
      .array(),
    isCoorectChoosen: zod.boolean().optional(),
  })
  .refine((data) => data.answers.some((answer) => answer.isCorrect), {
    message: 'Виберіть правильну відповідь',
    path: ['isCoorectChoosen'],
  });
