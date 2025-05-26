import { LoginRequestDto } from '@/lib/models/auth/dtos/LoginRequestDto';
import { apiClient } from '../lib/api';
import { AuthResponseDto } from '@/lib/models/auth/dtos/AuthResponseDto';
import { ForgotPasswordRequestDto } from '@/lib/models/auth/dtos/ForgotPasswordRequestDto';
import { RegisterRequestDto } from '@/lib/models/auth/dtos/RegisterRequestDto';
import { ResetPasswordRequestDto } from '@/lib/models/auth/dtos/ResetPasswordRequestDto';

export class AuthService {
  private readonly basePath = '/api/auth';

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const response = await apiClient.post<AuthResponseDto>(`${this.basePath}/login`, credentials);
    
    // Guardar token automáticamente
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  async register(userData: RegisterRequestDto): Promise<AuthResponseDto> {
    return apiClient.post<AuthResponseDto>(`${this.basePath}/register`, userData);
  }

  async forgotPassword(email: ForgotPasswordRequestDto): Promise<void> {
    return apiClient.post(`${this.basePath}/forgot-password`, email);
  }

  async resetPassword(resetData: ResetPasswordRequestDto): Promise<void> {
    return apiClient.post(`${this.basePath}/reset-password`, resetData);
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/logout`);
    } finally {
      // Limpiar token local independientemente del resultado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
  }

  async validateToken(): Promise<boolean> {
    try {
      await apiClient.get(`${this.basePath}/validate-token`);
      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();