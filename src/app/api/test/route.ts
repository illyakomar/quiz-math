import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/config';
import Test from '@/database/schemas/test.schema';
import { createRouteHandler } from '@/utils/createRouteHandler';
import { connectDb } from '@/utils/middleware/middleware/connectDb.middleware';

export const POST = createRouteHandler([connectDb], async (request: NextRequest) => {
  const payload = await request.json();

  const test = await Test.create(payload);
  return test;
});
