import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const loginSchema = zod.object({
  email: zod
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Введіть пошту коректно' }),
  password: zod
    .string({ required_error: 'Введіть пароль' })
    .pipe(nonemptyString('Введіть пароль')),
});
