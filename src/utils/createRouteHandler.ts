import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { Middleware } from './middleware/types';
import { execMiddleware } from './middleware/middleware';
import { handleHttpException } from './http/exceptions/exception';
import { HttpStatusCode } from './http/statusCode.enum';
import { NextHandler, NextParamsHandler } from './types';

export const createRouteHandler =
  (middlewares: Middleware[], handler: NextHandler) =>
  async (request: NextRequest, response: NextResponse) => {
    try {
      await execMiddleware(middlewares, request, response);
      const result = await handler(request);
      NextResponse.json(result, { status: HttpStatusCode.CREATED });
    } catch (error: any) {
      return handleHttpException(error);
    }
  };

export const createRouteParamsHandler =
  (middlewares: Middleware[], handler: NextParamsHandler) =>
  async (request: NextRequest, params: { params: { id: string } }) => {
    try {
      await execMiddleware(middlewares, request);
      const result = await handler(request, params);
      NextResponse.json(result, { status: HttpStatusCode.CREATED });
    } catch (error: any) {
      return handleHttpException(error);
    }
  };
