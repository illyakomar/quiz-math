import { TestInput } from '@/database/schemas/test.schema';
import { ApiService } from './api.service';
import { ApiResponse } from '../types';

export abstract class TestApiService {
  public static async createOne(data?: TestInput): Promise<ApiResponse<TestInput>> {
    return ApiService.post<TestInput>('test', data);
  }
}
