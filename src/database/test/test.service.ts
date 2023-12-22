import { QueryOptions, FilterQuery, ProjectionType } from 'mongoose';

import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { NotFoundException } from '@/utils/http/exceptions/exceptions/not-found.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-messages.enum';
import UtilsService from '../shared/utils.service';
import { SelectOptions } from '../types';
import Test, { TestInput, TestDocument, TestOutput } from './schemas/test.schema';

abstract class TestService {
  public static async createOne(
    testInput: TestInput,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<TestDocument>;

  public static async createOne(
    testInput: TestInput,
    selectOptions?: SelectOptions & { asDocument?: false },
  ): Promise<TestOutput>;

  public static async createOne(
    testInput: TestInput,
    selectOptions?: SelectOptions,
  ): Promise<TestDocument | TestOutput> {
    const { _id } = await Test.create<TestInput>({ ...testInput, _id: undefined }).catch(() => {
      throw new ConflictException(HttpExceptionMessageEnum.TEST_ALREADY_EXISTS);
    });
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async selectOne(
    query: FilterQuery<TestOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestDocument>;

  public static async selectOne(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestOutput>;

  public static async selectOne(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestDocument | TestOutput> {
    const test = await Test.findOne<TestDocument>(query, projection, options)
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_NOT_FOUND);
      });
    if (selectOptions?.asDocument) return test;
    return UtilsService.stringifyIds<TestOutput>(test);
  }

  public static async selectMany(
    query: FilterQuery<TestOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestDocument[]>;

  public static async selectMany(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestOutput[]>;

  public static async selectMany(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<TestOutput>,
    options?: QueryOptions,
  ): Promise<TestDocument[] | TestOutput[]> {
    const tests = await Test.find<TestDocument>(query, projection, options).catch(() => {
      throw new NotFoundException(HttpExceptionMessageEnum.TESTS_NOT_FOUND);
    });
    if (selectOptions?.asDocument) return tests;
    return tests.map((test) => UtilsService.stringifyIds<TestOutput>(test));
  }

  public static async updateOne(
    query: FilterQuery<TestOutput>,
    testInput: TestInput,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<TestDocument>;

  public static async updateOne(
    query: FilterQuery<TestOutput>,
    testInput: TestInput,
    selectOptions?: SelectOptions & { asDocument?: false },
  ): Promise<TestOutput>;

  public static async updateOne(
    query: FilterQuery<TestOutput>,
    testInput: TestInput,
    selectOptions?: SelectOptions,
  ): Promise<TestDocument | TestOutput> {
    const { _id } = await Test.findOneAndUpdate<TestDocument>(query, testInput, {
      new: true,
    })
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_NOT_FOUND);
      });
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async deleteOne(
    query: FilterQuery<TestOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    options?: QueryOptions,
  ): Promise<TestDocument>;

  public static async deleteOne(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    options?: QueryOptions,
  ): Promise<TestOutput>;

  public static async deleteOne(
    query: FilterQuery<TestOutput>,
    selectOptions?: SelectOptions,
    options?: QueryOptions,
  ): Promise<TestDocument | TestOutput> {
    const test = await Test.findOneAndDelete<TestDocument>(query, options)
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_NOT_FOUND);
      });
    if (selectOptions?.asDocument) Test;
    return UtilsService.stringifyIds<TestOutput>(test);
  }
}

export default TestService;
