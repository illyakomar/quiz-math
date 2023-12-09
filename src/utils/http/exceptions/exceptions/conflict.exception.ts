import { HttpException } from './http.exception';
import { HttpStatusCodeEnum } from '../../status-code.enum';

export class ConflictException extends HttpException {
  constructor(message?: string) {
    super('Conflict', HttpStatusCodeEnum.CONFLICT, message);
  }
}
