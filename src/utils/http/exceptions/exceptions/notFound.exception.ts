import { HttpException } from './http.exception';
import { HttpStatusCode } from '../../statusCode.enum';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super('Not Found', HttpStatusCode.NOT_FOUND, message);
  }
}
