import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import Test, { Status } from '@/database/models/test.model';
import TestTemplate from '@/database/models/testTemplate.model';

export const GET = async (request: NextRequest) => {
  await connect();

  const newTest = new Test({
    title: 'test',
    status: Status.ACTIVE,
    questions: [
      {
        text: 'test',
        answers: [
          {
            text: 'test1',
            isCorrect: true,
          },
          {
            text: 'test2',
            isCorrect: false,
          },
        ],
      },
    ],
  });

  try {
    await newTest.save();
    return new NextResponse('User has been created', {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
