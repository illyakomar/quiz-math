import { TestTemplateOutput } from '@/database/test-template/test-template.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';
import {
  CreateTestTemplateSchemaType,
  UpdateTestTemplateSchemaType,
} from '@/utils/http/shemas/test-template/types';

export abstract class TestTemplateApiService {
  public static async createOne(
    data: CreateTestTemplateSchemaType,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.post<TestTemplateOutput>('test-template', data, headers);
  }

  public static async updateOne(
    id: string,
    data: Partial<UpdateTestTemplateSchemaType>,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.patch<TestTemplateOutput>(`test-template/${id}`, data, headers);
  }

  public static async deleteOne(
    id: string,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestTemplateOutput>> {
    return ApiService.delete<TestTemplateOutput>(`test-template/${id}`, headers);
  }
}
