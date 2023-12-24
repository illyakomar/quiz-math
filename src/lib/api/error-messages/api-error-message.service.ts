import { ApiErrorMessageEnum } from './api-error-message.enum';

export default abstract class ApiErrorMessageService {
  public static get = (messageAlias: ApiErrorMessageEnum): string => {
    const message =
      ApiErrorMessageEnum[messageAlias as unknown as keyof typeof ApiErrorMessageEnum] ||
      ApiErrorMessageEnum.INTERNAL_SERVER_ERROR;
    return message;
  };
}
