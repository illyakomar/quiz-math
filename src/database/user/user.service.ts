import { QueryOptions, FilterQuery, ProjectionType } from 'mongoose';

import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { NotFoundException } from '@/utils/http/exceptions/exceptions/not-found.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';
import UtilsService from '../shared/utils.service';
import { SelectOptions } from '../types';
import User, { UserInput, UserDocument, UserOutput } from './user.schema';

abstract class UserService {
  public static async createOne(
    userInput: UserInput,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<UserDocument>;

  public static async createOne(
    userInput: UserInput,
    selectOptions?: SelectOptions & { asDocument: false },
  ): Promise<UserOutput>;

  public static async createOne(
    userInput: UserInput,
    selectOptions?: SelectOptions,
  ): Promise<UserDocument | UserOutput> {
    const { _id } = await User.create<UserInput>(userInput).catch(() => {
      throw new ConflictException(HttpExceptionMessageEnum.USER_ALREADY_EXISTS);
    });
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async selectOne(
    query: FilterQuery<UserOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    options?: QueryOptions,
  ): Promise<UserDocument>;

  public static async selectOne(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions & { asDocument: false },
    options?: QueryOptions,
  ): Promise<UserOutput>;

  public static async selectOne(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<UserOutput>,
    options?: QueryOptions,
  ): Promise<UserDocument | UserOutput> {
    const user = (await User.findOne<UserDocument>(query, projection, options).catch(() => {
      throw new NotFoundException(HttpExceptionMessageEnum.USER_NOT_FOUND);
    })) as UserDocument;
    if (selectOptions?.asDocument) return user;
    return UtilsService.stringifyIds<UserOutput>(user);
  }

  public static async selectMany(
    query: FilterQuery<UserOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    options?: QueryOptions,
  ): Promise<UserOutput[]>;

  public static async selectMany(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions & { asDocument: false },
    options?: QueryOptions,
  ): Promise<UserDocument[]>;

  public static async selectMany(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<UserOutput>,
    options?: QueryOptions,
  ): Promise<UserDocument[] | UserOutput[]> {
    const users = (await User.find<UserDocument>(query, projection, options).catch(() => {
      throw new NotFoundException(HttpExceptionMessageEnum.USERS_NOT_FOUND);
    })) as UserDocument[];
    if (!users.length) return [];
    if (!selectOptions?.asDocument) return users;
    return users.map((user) => UtilsService.stringifyIds<UserOutput>(user));
  }

  public static async updateOne(
    query: FilterQuery<UserOutput>,
    userInput: UserInput,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<UserDocument>;

  public static async updateOne(
    query: FilterQuery<UserOutput>,
    userInput: UserInput,
    selectOptions?: SelectOptions & { asDocument: false },
  ): Promise<UserOutput>;

  public static async updateOne(
    query: FilterQuery<UserOutput>,
    userInput: UserInput,
    selectOptions?: SelectOptions,
  ): Promise<UserDocument | UserOutput> {
    const { _id } = (await User.findOneAndUpdate<UserInput>(query, userInput, { new: true }).catch(
      () => {
        throw new ConflictException(HttpExceptionMessageEnum.TEST_TEMPLATE_ALREADY_EXISTS);
      },
    )) as UserDocument;
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async deleteOne(
    query: FilterQuery<UserOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    options?: QueryOptions,
  ): Promise<UserDocument>;

  public static async deleteOne(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions & { asDocument: false },
    options?: QueryOptions,
  ): Promise<UserOutput>;

  public static async deleteOne(
    query: FilterQuery<UserOutput>,
    selectOptions?: SelectOptions,
    options?: QueryOptions,
  ): Promise<UserDocument | UserOutput> {
    const user = (await User.findOneAndDelete<UserInput>(query, options).catch(() => {
      throw new ConflictException(HttpExceptionMessageEnum.TEST_TEMPLATE_ALREADY_EXISTS);
    })) as UserDocument;
    if (selectOptions?.asDocument) user;
    return UtilsService.stringifyIds<UserOutput>(user);
  }
}

export default UserService;