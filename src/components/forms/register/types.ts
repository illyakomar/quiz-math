import zod from 'zod';
import { registerSchema } from './schemas';

export type RegisterSchemaType = zod.infer<typeof registerSchema>;
