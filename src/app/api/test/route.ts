import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import Test, { Status } from '@/database/models/Test';
import TestTemplate from '@/database/models/TestTemplate';

export const GET = async (request: NextRequest) => {
  await connect();

  const newTest = new Test({
    title: 'test',
    status: Status.ACTIVE,
  });
  const newTestTemplate = new TestTemplate({
    title: 'testTemplate',
  });

  try {
    await newTest.save();
    await newTestTemplate.save();
    return new NextResponse('User has been created', {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
