import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/config';
import Test from '@/database/schemas/testTemplate.schema';
import { createRouteParamsHandler } from '@/utils/createRouteHandler';
import { connectDb } from '@/utils/middleware/middleware/connectDb.middleware';

export const PATCH = createRouteParamsHandler(
  [connectDb],
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const payload = await request.json();

    const test = await Test.findOneAndUpdate({ _id: params.id }, payload, {
      new: true,
    });
    return test;
  },
);

export const DELETE = createRouteParamsHandler(
  [connectDb],
  async (_id: NextRequest, { params }: { params: { id: string } }) => {
    const test = await Test.findOneAndDelete({ _id: params.id });
    return test;
  },
);
