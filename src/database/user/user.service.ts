import { QueryOptions, FilterQuery } from 'mongoose';

import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { NotFoundException } from '@/utils/http/exceptions/exceptions/not-found.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';
import UtilsService from '../utils.service';
import { SelectOptions } from '../types';
import User, { UserInput, UserDocument, UserOutput } from './user.schema';

abstract class UserService {
  public static async createOne(
    userInput: UserInput,
    selectOptions?: SelectOptions,
  ): Promise<UserDocument | UserOutput> {
    return UtilsService.withMongooseTransaction(async () => {
      const { _id } = await User.create<UserInput>(userInput).catch(() => {
        throw new ConflictException(HttpExceptionMessageEnum.USER_ALREADY_EXISTS);
      });
      return this.selectOne({ _id }, {}, selectOptions);
    });
  }

  public static async selectOne(
    query: FilterQuery<UserOutput>,
    options?: QueryOptions,
    selectOptions?: SelectOptions,
  ): Promise<UserDocument | UserOutput> {
    const user = await this.selectOneDefault(query, options);
    if (!user) throw new NotFoundException(HttpExceptionMessageEnum.USER_NOT_FOUND);
    if (!selectOptions?.stringifiedId) return user;
    return UtilsService.stringifyId<UserOutput>(user);
  }

  private static async selectOneDefault(
    query: FilterQuery<UserOutput>,
    options?: QueryOptions,
  ): Promise<UserDocument | null> {
    return User.findOne<UserDocument>(query, {}, options).catch(() => {
      throw new NotFoundException(HttpExceptionMessageEnum.USER_NOT_FOUND);
    });
  }
}

export default UserService;
