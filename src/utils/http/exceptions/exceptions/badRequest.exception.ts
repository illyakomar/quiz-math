import { HttpException } from './http.exception';
import { HttpStatusCode } from '../../statusCode.enum';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super('Bad Request', HttpStatusCode.BAD_REQUEST, message);
  }
}
