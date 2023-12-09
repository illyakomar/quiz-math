import { NextResponse } from 'next/server';

import { HttpException } from './exceptions/http.exception';
import { HttpStatusCodeEnum } from '../status-code.enum';
import { HttpExceptionMessageEnum } from './http-exception-messages.enum';

export const isHttpException = (error: any): error is HttpException =>
  error instanceof HttpException;

export const handleHttpException = (error: any) => {
  const name = isHttpException(error)
    ? error.name
    : HttpExceptionMessageEnum.INTERNAL_SERVER_ERROR;
  const statusCode = isHttpException(error)
    ? error.statusCode
    : HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
  const message = isHttpException(error)
    ? error.message
    : HttpExceptionMessageEnum.INTERNAL_SERVER_ERROR;
  const responseBody = {
    error: name,
    statusCode,
    message,
  };
  return NextResponse.json(responseBody, { status: statusCode });
};
