import { NextRequest, NextResponse } from 'next/server';

import { Middleware } from './types';

export async function execMiddleware(
  middlewares: Middleware[],
  req?: NextRequest,
  res?: NextResponse,
) {
  for (let i = 0; i < middlewares.length; i += 2) {
    await middlewares[i](req, res);
  }
}
