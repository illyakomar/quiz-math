import { TestOutput } from '@/database/test/schemas/test.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';
import { CreateTestSchemaType, UpdateTestSchemaType } from '@/utils/http/shemas/test/types';

export abstract class TestApiService {
  public static async createOne(
    data: CreateTestSchemaType,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestOutput>> {
    return ApiService.post<TestOutput>('test', data, headers);
  }

  public static async updateOne(
    id: string,
    data: Partial<UpdateTestSchemaType>,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestOutput>> {
    return ApiService.patch<TestOutput>(`test/${id}`, data, headers);
  }

  public static async updateOneParticipants(
    id: string,
    data: Pick<UpdateTestSchemaType, 'participants'>,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestOutput>> {
    return ApiService.patch<TestOutput>(`test/${id}/participants`, data, headers);
  }

  public static async deleteOne(
    id: string,
    headers?: HeadersInit,
  ): Promise<ApiResponse<TestOutput>> {
    return ApiService.delete<TestOutput>(`test/${id}`, headers);
  }
}
