import { CreateUserRequestDto } from '@/lib/models/users/dtos/CreateUserRequestDto';
import { UpdateUserRequestDto } from '@/lib/models/users/dtos/UpdateUserRequestDto';
import { UserResponseDto } from '@/lib/models/users/dtos/UserResponseDto';
import { apiClient } from '../lib/api';

export class UserService {
  private readonly basePath = '/api/users';

  async getUsers(): Promise<UserResponseDto[]> {
    return apiClient.get<UserResponseDto[]>(this.basePath);
  }

  async getUser(id: number): Promise<UserResponseDto> {
    return apiClient.get<UserResponseDto>(`${this.basePath}/${id}`);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    return apiClient.get<UserResponseDto>(`${this.basePath}/email/${email}`);
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    return apiClient.get<UserResponseDto>(`${this.basePath}/${id}`);
  }

  async getCurrentUser(): Promise<UserResponseDto> {
    return apiClient.get<UserResponseDto>(`${this.basePath}/me`);
  }

  async createUser(user: CreateUserRequestDto): Promise<UserResponseDto> {
    return apiClient.post<UserResponseDto>(this.basePath, user);
  }

  async updateUser(id: number, user: UpdateUserRequestDto): Promise<UserResponseDto> {
    return apiClient.put<UserResponseDto>(`${this.basePath}/${id}`, user);
  }

  async updateCurrentUser(user: UpdateUserRequestDto): Promise<UserResponseDto> {
    return apiClient.put<UserResponseDto>(`${this.basePath}/me`, user);
  }

  async deleteUser(id: number): Promise<void> {
    return apiClient.delete(`${this.basePath}/${id}`);
  }
}

export const userService = new UserService();