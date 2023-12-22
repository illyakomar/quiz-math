import { TestOutput } from '@/database/test/schemas/test.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';
import { CreateTestSchemaType, UpdateTestSchemaType } from '@/utils/http/shemas/test/types';

export abstract class TestApiService {
  public static async createOne(data?: CreateTestSchemaType): Promise<ApiResponse<TestOutput>> {
    return ApiService.post<TestOutput>('test', data);
  }

  public static async updateOne(
    id: string,
    data?: UpdateTestSchemaType,
  ): Promise<ApiResponse<TestOutput>> {
    return ApiService.patch<TestOutput>(`test/${id}`, data);
  }

  public static async deleteOne(id: string): Promise<ApiResponse<TestOutput>> {
    return ApiService.delete<TestOutput>(`test/${id}`);
  }
}
