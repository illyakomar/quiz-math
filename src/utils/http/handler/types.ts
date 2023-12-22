import { NextResponse } from 'next/server';

import { NextRequestBodyType } from '../../middleware/classes/next-request-body-type';

export type NextRouteHandler = (
  request: NextRequestBodyType,
  response?: NextResponse,
) => Promise<any> | any;

export type NextRouteParamsHandler = (
  request: NextRequestBodyType,
  { params }: { params: { id: string } },
) => Promise<any> | any;
