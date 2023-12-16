import { NextResponse } from 'next/server';

import { NextRequestBodyType } from './classes/next-request-body-type';

export type Middleware = (
  request: NextRequestBodyType,
  response?: NextResponse,
) => Promise<unknown> | unknown;
