import { QueryOptions, FilterQuery } from 'mongoose';

import User, { UserInput, UserDocument } from '../models/user.model';

abstract class UserService {
  public static async createOne(userInput: UserInput): Promise<UserDocument> {
    await User.create(userInput);
    return this.selectOne(userInput);
  }

  public static async selectOne(
    query: FilterQuery<UserDocument>,
    options?: QueryOptions,
  ): Promise<UserDocument> {
    return User.findOne(query, null, options).catch((error) => console.log(error));
  }
}

export default UserService;
