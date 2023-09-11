import zod from 'zod';
import { loginSchema } from './schemas';

export type LoginSchemaType = zod.infer<typeof loginSchema>;
