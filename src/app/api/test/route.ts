import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import Test from '@/database/models/test.model';

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    await connect();

    const test = await Test.create(payload);
    return new NextResponse(JSON.stringify(test.toObject()), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
