import { updateTestSchema } from './test-update.schema';

export const updateTestParticipantsSchema = updateTestSchema.pick({ participants: true });
