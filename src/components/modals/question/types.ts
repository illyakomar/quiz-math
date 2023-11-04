import zod from 'zod';
import { questionSchema } from './schemas';

export type QuestionSchemaType = zod.infer<typeof questionSchema>;
