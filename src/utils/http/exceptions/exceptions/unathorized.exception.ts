import { HttpException } from './http.exception';
import { HttpStatusCode } from '../../statusCode.enum';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super('Bad Request', HttpStatusCode.UNAUTHORIZED, message);
  }
}
