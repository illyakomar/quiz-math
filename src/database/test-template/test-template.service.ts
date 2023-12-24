import { QueryOptions, FilterQuery, ProjectionType } from 'mongoose';

import { ConflictException } from '@/utils/http/exceptions/exceptions/conflict.exception';
import { NotFoundException } from '@/utils/http/exceptions/exceptions/not-found.exception';
import { HttpExceptionMessageEnum } from '@/utils/http/exceptions/http-exception-message.enum';
import UtilsService from '../shared/utils.service';
import { SelectOptions } from '../types';
import TestTemplate, {
  TestTemplateInput,
  TestTemplateDocument,
  TestTemplateOutput,
} from './test-template.schema';
import { UpdateQuery } from 'mongoose';

abstract class TestTemplateService {
  public static async createOne(
    testTemplateInput: TestTemplateInput,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<TestTemplateDocument>;

  public static async createOne(
    testTemplateInput: TestTemplateInput,
    selectOptions?: SelectOptions & { asDocument?: false },
  ): Promise<TestTemplateOutput>;

  public static async createOne(
    testTemplateInput: TestTemplateInput,
    selectOptions?: SelectOptions,
  ): Promise<TestTemplateDocument | TestTemplateOutput> {
    const { _id } = await TestTemplate.create<TestTemplateInput>(testTemplateInput).catch(() => {
      throw new ConflictException(HttpExceptionMessageEnum.TEST_TEMPLATE_ALREADY_EXISTS);
    });
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async selectOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateDocument>;

  public static async selectOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateOutput>;

  public static async selectOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateDocument | TestTemplateOutput> {
    const testTemplate = await TestTemplate.findOne<TestTemplateDocument>(
      query,
      projection,
      options,
    )
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_TEMPLATE_NOT_FOUND);
      });
    if (selectOptions?.asDocument) return testTemplate;
    return UtilsService.stringifyIds<TestTemplateOutput>(testTemplate);
  }

  public static async selectMany(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateDocument[]>;

  public static async selectMany(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateOutput[]>;

  public static async selectMany(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions,
    projection?: ProjectionType<TestTemplateOutput>,
    options?: QueryOptions,
  ): Promise<TestTemplateDocument[] | TestTemplateOutput[]> {
    const testTemplates = await TestTemplate.find<TestTemplateDocument>(
      query,
      projection,
      options,
    ).catch(() => {
      throw new NotFoundException(HttpExceptionMessageEnum.TEST_TEMPLATES_NOT_FOUND);
    });
    if (selectOptions?.asDocument) return testTemplates;
    return testTemplates.map((testTemplate) =>
      UtilsService.stringifyIds<TestTemplateOutput>(testTemplate),
    );
  }

  public static async updateOne(
    query: FilterQuery<TestTemplateOutput>,
    testTemplateInput: UpdateQuery<TestTemplateInput> & Partial<TestTemplateInput>,
    selectOptions: SelectOptions & { asDocument: true },
  ): Promise<TestTemplateDocument>;

  public static async updateOne(
    query: FilterQuery<TestTemplateOutput>,
    testTemplateInput: UpdateQuery<TestTemplateInput> & Partial<TestTemplateInput>,
    selectOptions?: SelectOptions & { asDocument?: false },
  ): Promise<TestTemplateOutput>;

  public static async updateOne(
    query: FilterQuery<TestTemplateOutput>,
    testTemplateInput: UpdateQuery<TestTemplateInput> & Partial<TestTemplateInput>,
    selectOptions?: SelectOptions,
  ): Promise<TestTemplateDocument | TestTemplateOutput> {
    const { _id } = await TestTemplate.findOneAndUpdate<TestTemplateDocument>(
      query,
      testTemplateInput,
      { new: true },
    )
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_TEMPLATE_NOT_FOUND);
      });
    if (selectOptions?.asDocument) return this.selectOne({ _id }, { asDocument: true });
    return this.selectOne({ _id }, { asDocument: false });
  }

  public static async deleteOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions: SelectOptions & { asDocument: true },
    options?: QueryOptions,
  ): Promise<TestTemplateDocument>;

  public static async deleteOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions & { asDocument?: false },
    options?: QueryOptions,
  ): Promise<TestTemplateOutput>;

  public static async deleteOne(
    query: FilterQuery<TestTemplateOutput>,
    selectOptions?: SelectOptions,
    options?: QueryOptions,
  ): Promise<TestTemplateDocument | TestTemplateOutput> {
    const testTemplate = await TestTemplate.findOneAndDelete<TestTemplateDocument>(query, options)
      .orFail()
      .catch(() => {
        throw new NotFoundException(HttpExceptionMessageEnum.TEST_TEMPLATE_NOT_FOUND);
      });

    if (selectOptions?.asDocument) testTemplate;
    return UtilsService.stringifyIds<TestTemplateOutput>(testTemplate);
  }
}

export default TestTemplateService;
