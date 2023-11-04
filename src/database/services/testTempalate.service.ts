import { QueryOptions, FilterQuery } from 'mongoose';

import TestTemplate, {
  TestTemplateInput,
  TestTemplateDocument,
} from '../models/testTemplate.model';

abstract class TestTemplateService {
  public static async createOne(userInput: TestTemplateInput): Promise<TestTemplateDocument> {
    await TestTemplate.create(userInput);
    return this.selectOne(userInput);
  }

  public static async selectOne(
    query: FilterQuery<TestTemplateDocument>,
    options: QueryOptions = { lean: true },
  ): Promise<TestTemplateDocument> {
    return TestTemplate.findOne(query, null, options).catch((error) => console.log(error));
  }
}

export default TestTemplateService;
