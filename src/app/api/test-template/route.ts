import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/config';
import TestTemplate from '@/database/schemas/testTemplate.schema';
import { createRouteHandler } from '@/utils/createRouteHandler';
import { connectDb } from '@/utils/middleware/middleware/connectDb.middleware';

export const POST = createRouteHandler([connectDb], async (request: NextRequest) => {
  const payload = await request.json();

  const testTemplate = await TestTemplate.create(payload);
  return testTemplate;
});
