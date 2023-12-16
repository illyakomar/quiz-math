import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';
import { questionSchema } from '@/components/modals/question/schemas';

export const testSchema = zod.object({
  title: zod.string({ required_error: 'Введіть назву' }).pipe(nonemptyString('Введіть назву')),
  questions: zod
    .array(questionSchema)
    .default([])
    .refine((questions) => questions.length, 'Додайте хоча б одне питання'),
});
