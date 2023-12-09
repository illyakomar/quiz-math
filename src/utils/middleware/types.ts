import { NextResponse } from 'next/server';

import { NextRequestBodyType } from '../http/exceptions/classes/next-request-body-type';

export type Middleware = (
  request: NextRequestBodyType,
  response?: NextResponse,
) => Promise<unknown> | unknown;
