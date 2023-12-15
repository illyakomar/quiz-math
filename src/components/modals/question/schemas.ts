import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const questionSchema = zod.object({
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
    .array()
    .superRefine((answers, ctx) => {
      const isCorrectAnswerChosen = answers.some((answer) => answer.isCorrect);
      console.log(isCorrectAnswerChosen);
      if (!isCorrectAnswerChosen) {
        ctx.addIssue({
          fatal: true,
          code: zod.ZodIssueCode.custom,
          message: 'Виберіть правильну відповідь',
          path: ['correct'],
        });
      }
    }),
});
