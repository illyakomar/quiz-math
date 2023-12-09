import { HttpException } from './http.exception';
import { HttpStatusCodeEnum } from '../../status-code.enum';

export class BadRequestException extends HttpException {
  constructor(message?: string[] | string) {
    super('Bad Request', HttpStatusCodeEnum.BAD_REQUEST, message);
  }
}
