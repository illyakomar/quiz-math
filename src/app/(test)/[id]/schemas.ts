import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const leadSchema = zod.object({
  fullName: zod
    .string({ required_error: "Введіть ім'я та прізвище" })
    .pipe(nonemptyString("Введіть ім'я та прізвище")),
});
