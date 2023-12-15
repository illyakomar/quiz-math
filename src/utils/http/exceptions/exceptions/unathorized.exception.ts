import { HttpException } from './http.exception';
import { HttpStatusCodeEnum } from '../../status-code.enum';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super('Bad Request', HttpStatusCodeEnum.UNAUTHORIZED, message);
  }
}
