import { NextRequest, NextResponse } from 'next/server';

import connect from '@/database/connection';
import Test from '@/database/models/testTemplate.model';

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const payload = await request.json();

    await connect();

    const test = await Test.findOneAndUpdate({ _id: params.id }, payload, {
      new: true,
    });
    return new NextResponse(JSON.stringify(test?.toObject()), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connect();

    const test = await Test.findOneAndDelete({ _id: params.id });
    return new NextResponse(JSON.stringify(test?.toObject()), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};