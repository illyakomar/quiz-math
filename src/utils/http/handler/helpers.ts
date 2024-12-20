import { NextRequest, NextResponse } from 'next/server';

import { Middleware } from '../../middleware/types';
import { execMiddleware } from '../../middleware/helpers';
import { handleHttpException } from '../exceptions/helpers';
import { HttpStatusCodeEnum } from '../status-code.enum';
import { NextRouteHandler, NextRouteParamsHandler } from './types';
import { NextRequestBodyType } from '../../middleware/classes/next-request-body-type';

export const createRouteHandler =
  (middlewares: Middleware[], handler: NextRouteHandler) =>
  async (request: NextRequest, response: NextResponse) => {
    try {
      const requestBodyType = new NextRequestBodyType(request);
      await execMiddleware(middlewares, requestBodyType, response);
      const result = await handler(requestBodyType);
      return NextResponse.json(result, { status: HttpStatusCodeEnum.OK });
    } catch (error: any) {
      return handleHttpException(error);
    }
  };

export const createRouteParamsHandler =
  (middlewares: Middleware[], handler: NextRouteParamsHandler) =>
  async (request: NextRequest, params: { params: { id: string } }) => {
    try {
      const requestBodyType = new NextRequestBodyType(request);
      await execMiddleware(middlewares, requestBodyType);
      const result = await handler(requestBodyType, params);
      return NextResponse.json(result, { status: HttpStatusCodeEnum.OK });
    } catch (error: any) {
      return handleHttpException(error);
    }
  };
