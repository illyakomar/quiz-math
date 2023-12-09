import { HttpException } from './http.exception';
import { HttpStatusCodeEnum } from '../../status-code.enum';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super('Not Found', HttpStatusCodeEnum.NOT_FOUND, message);
  }
}
