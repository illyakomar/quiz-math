import zod from 'zod';

import { createTestSchema } from './test-create.schema';
import { updateTestSchema } from './test-update.schema';

export type CreateTestSchemaType = zod.infer<typeof createTestSchema>;

export type UpdateTestSchemaType = zod.infer<typeof updateTestSchema>;
