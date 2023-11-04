import { QueryOptions, FilterQuery } from 'mongoose';

import Test, { TestInput, TestDocument } from '../models/test.model';

abstract class TestService {
  public static async createOne(testInput: TestInput): Promise<TestInput> {
    await Test.create(testInput);
    return this.selectOne(testInput);
  }

  public static async selectOne(
    query: FilterQuery<TestDocument>,
    options: QueryOptions = { lean: true },
  ): Promise<TestInput> {
    return Test.findOne(query, null, options).catch((error) => console.log(error));
  }
}

export default TestService;
