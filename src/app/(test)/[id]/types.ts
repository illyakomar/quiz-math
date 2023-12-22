import zod from 'zod';
import { leadSchema } from './schemas';

export type LeadSchemaType = zod.infer<typeof leadSchema>;
