import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import TestTemplateService from '@/database/services/testTempalate.service';

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();

    await connect();

    await TestTemplateService.createOne(payload);

    return new NextResponse('Test has been created', {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
