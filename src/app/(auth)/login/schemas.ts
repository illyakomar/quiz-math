import zod from 'zod';

export const loginSchema = zod.object({
  email: zod
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Введіть пошту коректно' }),
  password: zod.string({ required_error: 'Введіть пароль' }).min(4, 'Закороткий пароль'),
});
