import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import TestTemplate from '@/database/models/testTemplate.model';

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    await connect();

    const testTemplate = await TestTemplate.create(payload);
    return new NextResponse(JSON.stringify(testTemplate.toObject()), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
