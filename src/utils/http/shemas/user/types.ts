import zod from 'zod';

import { createUserSchema } from './user-create.schema';

export type CreateUserSchemaType = zod.infer<typeof createUserSchema>;
