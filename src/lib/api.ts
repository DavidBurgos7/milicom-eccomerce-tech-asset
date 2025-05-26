import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PagedResponse } from './models/api/PagedResponse';

// Configuración base de Axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            withCredentials: true,
        });

        // Interceptor para requests - agregar token automáticamente
        this.client.interceptors.request.use(
            (config) => {
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor para responses - manejo de errores
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
            if (error.response?.status === 401) {
                // Token expirado o inválido
                this.removeToken();
                window.location.href = '/login';
            }
            return Promise.reject(error);
            }
        );
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('auth_token');
        }
        return null;
    }
    
    private removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
    }
    
    public setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
        }
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    // Método para respuestas paginadas
    async getPaged<T>(url: string, config?: AxiosRequestConfig): Promise<PagedResponse<T>> {
        const response = await this.client.get<PagedResponse<T>>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }

}

export const apiClient = new ApiClient();