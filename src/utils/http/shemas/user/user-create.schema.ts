import zod from 'zod';

import { nonemptyString } from '@/lib/validation/pipelines';

export const createUserSchema = zod.object({
  firstName: zod.string().pipe(nonemptyString()),
  lastName: zod.string().pipe(nonemptyString()),
  email: zod.string().email(),
  password: zod.string().min(4),
});
