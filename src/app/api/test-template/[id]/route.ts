import { NextRequest, NextResponse } from 'next/server';

import TestTemplate, { TestTemplateDocument } from '@/database/schemas/testTemplate.schema';
import { createRouteParamsHandler } from '@/utils/createRouteHandler';
import { connectDb } from '@/utils/middleware/middleware/connectDb.middleware';

export const PATCH = createRouteParamsHandler(
  [connectDb],
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const payload = await request.json();

    const testTemplate = await TestTemplate.findOneAndUpdate<TestTemplateDocument>(
      { _id: params.id },
      payload,
      {
        new: true,
      },
    );
    return testTemplate;
  },
);

export const DELETE = createRouteParamsHandler(
  [connectDb],
  async (_id: NextRequest, { params }: { params: { id: string } }) => {
    const testTemplate = await TestTemplate.findOneAndDelete({ _id: params.id });
    return testTemplate;
  },
);
