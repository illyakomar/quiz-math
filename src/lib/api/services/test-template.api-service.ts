import { TestTemplateOutput } from '@/database/test-template/test-template.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';
import {
  CreateTestTemplateSchemaType,
  UpdateTestTemplateSchemaType,
} from '@/utils/http/shemas/test-template/types';

export abstract class TestTemplateApiService {
  public static async createOne(
    data?: CreateTestTemplateSchemaType,
  ): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.post<TestTemplateOutput>('test-template', data);
  }

  public static async updateOne(
    id: string,
    data?: UpdateTestTemplateSchemaType,
  ): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.patch<TestTemplateOutput>(`test-template/${id}`, data);
  }

  public static async deleteOne(id: string): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.delete<TestTemplateOutput>(`test-template/${id}`);
  }
}
