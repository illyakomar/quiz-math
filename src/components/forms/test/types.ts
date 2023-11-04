import zod from 'zod';
import { testSchema } from './schemas';

export type TestSchemaType = zod.infer<typeof testSchema>;
