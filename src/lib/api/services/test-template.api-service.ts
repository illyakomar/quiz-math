import { TestTemplateInput } from '@/database/test-template/test-template.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';

export abstract class TestTemplateApiService {
  public static async createOne(
    data?: TestTemplateInput,
  ): Promise<ApiResponse<TestTemplateInput>> {
    return ApiService.post<TestTemplateInput>('test-template', data);
  }

  public static async updateOne(
    id: string,
    data?: TestTemplateInput,
  ): Promise<ApiResponse<TestTemplateInput>> {
    return ApiService.patch<TestTemplateInput>(`test-template/${id}`, data);
  }

  public static async deleteOne(id: string): Promise<ApiResponse<TestTemplateInput>> {
    return ApiService.delete<TestTemplateInput>(`test-template/${id}`);
  }
}
