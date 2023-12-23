import { UserOutput } from '@/database/user/user.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';
import { CreateUserSchemaType } from '@/utils/http/shemas/user/types';

export abstract class UserApiService {
  public static async createOne(
    data: CreateUserSchemaType,
    headers?: HeadersInit,
  ): Promise<ApiResponse<UserOutput>> {
    return ApiService.post<UserOutput>('auth/register', data, headers);
  }
}
