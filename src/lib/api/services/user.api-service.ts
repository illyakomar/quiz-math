import { UserInput } from '@/database/user/user.schema';
import { ApiService } from './api-service';
import { ApiResponse } from '../types';

export abstract class UserApiService {
  public static async createOne(data?: UserInput): Promise<ApiResponse<UserInput>> {
    return ApiService.post<UserInput>('auth/register', data);
  }
}
