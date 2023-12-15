import { NextResponse } from 'next/server';

import { NextRequestBodyType } from '../exceptions/classes/next-request-body-type';

export type NextHandler = (
  request: NextRequestBodyType,
  response?: NextResponse,
) => Promise<any> | any;

export type NextParamsHandler = (
  request: NextRequestBodyType,
  { params }: { params: { id: string } },
) => Promise<any> | any;
