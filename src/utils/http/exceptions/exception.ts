import { NextResponse } from 'next/server';

import { HttpException } from './exceptions/http.exception';
import { HttpStatusCode } from '../statusCode.enum';

export const isHttpException = (error: any): error is HttpException =>
  error instanceof HttpException;

export const handleHttpException = (error: any) => {
  const name = isHttpException(error) ? error.name : 'Internal Server Error';
  const message = isHttpException(error) ? error.message : 'Internal Server Error';
  const statusCode = isHttpException(error)
    ? error.statusCode
    : HttpStatusCode.INTERNAL_SERVER_ERROR;
  const responseBody = {
    error: name,
    statusCode,
    message,
  };
  return NextResponse.json(responseBody, { status: statusCode });
};
