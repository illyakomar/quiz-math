import { TestInput, TestOutput } from '@/database/test/schemas/test.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';

export abstract class TestApiService {
  public static async createOne(data?: TestInput): Promise<ApiResponse<TestOutput>> {
    return ApiService.post<TestOutput>('test', data);
  }
}
