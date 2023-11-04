import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const registerSchema = zod.object({
  firstName: zod.string({ required_error: "Введіть ім'я" }).pipe(nonemptyString("Введіть ім'я")),
  lastName: zod
    .string({ required_error: 'Введіть прізвище' })
    .pipe(nonemptyString('Введіть прізвище')),
  email: zod
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Введіть пошту коректно' }),
  password: zod.string({ required_error: 'Введіть пароль' }).min(4, 'Закороткий пароль'),
});
