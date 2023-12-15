import { NextRequest, NextResponse } from 'next/server';

import { Middleware } from './types';
import { NextRequestBodyType } from '../http/exceptions/classes/next-request-body-type';

export async function execMiddleware(
  middleware: Middleware[],
  request: NextRequestBodyType,
  response?: NextResponse,
) {
  for (let i = 0; i < middleware.length; i++) {
    await middleware[i](request, response);
  }
}
