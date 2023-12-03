import mongoose, { QueryOptions, FilterQuery } from 'mongoose';
import User, { UserInput, UserDocument } from '../schemas/user.schema';
import UtilsService from './utils.service';

abstract class UserService {
  public static async createOne(userInput: UserInput): Promise<UserDocument | null> {
    return UtilsService.withMongooseTransaction(async () => {
      const { _id } = await User.create(userInput);
      const result = this.selectOne({ _id });
      return result;
    });
  }

  public static async selectOne(
    query: FilterQuery<UserDocument>,
    options?: QueryOptions,
  ): Promise<UserDocument | null> {
    return User.findOne(query, null, options).catch(() => {
      throw new Error('1');
    });
  }
}

export default UserService;
