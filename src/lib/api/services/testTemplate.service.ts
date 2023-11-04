import { TestTemplateInput } from '@/database/models/testTemplate.model';
import { ApiService } from './api.service';
import { ApiResponse } from '../types';

export abstract class TestTemplateApiService {
  public static async createOne(
    data?: TestTemplateInput,
  ): Promise<ApiResponse<TestTemplateInput>> {
    return ApiService.post<TestTemplateInput>('test', data);
  }
}
