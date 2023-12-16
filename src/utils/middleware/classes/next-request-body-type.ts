import { NextRequest } from 'next/server';

export class NextRequestBodyType<T = any> {
  public request: NextRequest;
  public parsedBody: T;

  public constructor(request: NextRequest) {
    this.request = request;
  }

  public parseBody = async () => {
    this.parsedBody = (await this.request.json()) as T;
  };
}
