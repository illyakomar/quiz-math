import { HttpException } from './http.exception';
import { HttpStatusCode } from '../../statusCode.enum';

export class ConflictException extends HttpException {
  constructor(message?: string) {
    super('Conflict', HttpStatusCode.CONFLICT, message);
  }
}
