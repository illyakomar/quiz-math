import zod from 'zod';

import { createTestTemplateSchema } from './test-template-create.schema';
import { updateTestTemplateSchema } from './test-template-update.schema';

export type CreateTestTemplateSchemaType = zod.infer<typeof createTestTemplateSchema>;

export type UpdateTestTemplateSchemaType = zod.infer<typeof updateTestTemplateSchema>;
