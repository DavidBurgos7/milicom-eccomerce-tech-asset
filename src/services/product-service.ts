import { ProductSearchRequestDto } from '@/lib/models/products/dtos/ProductSearchRequestDto';
import { apiClient } from '../lib/api';
import { ProductCreateRequestDto } from '@/lib/models/products/dtos/ProductCreateRequestDto';
import { ProductResponseDto } from '@/lib/models/products/dtos/ProductResponseDto';
import { StockUpdateRequestDto } from '@/lib/models/products/dtos/StockUpdateRequestDto';
import { PagedResponse } from '@/lib/models/api/PagedResponse';

export class ProductService {
    private readonly basePath = '/api/products';
  
    // Método para obtener productos con paginación
    async getProducts(searchParams?: ProductSearchRequestDto): Promise<PagedResponse<ProductResponseDto>> {
      const params = new URLSearchParams();
      
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      
      const queryString = params.toString();
      const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
      
      return apiClient.getPaged<ProductResponseDto>(url);
    }
  
    // Método para obtener solo el contenido (sin metadatos de paginación)
    async getProductsContent(searchParams?: ProductSearchRequestDto): Promise<ProductResponseDto[]> {
      const pagedResponse = await this.getProducts(searchParams);
      return pagedResponse.content;
    }
  
    async getProduct(id: number): Promise<ProductResponseDto> {
      return apiClient.get<ProductResponseDto>(`${this.basePath}/${id}`);
    }
  
    async createProduct(product: ProductCreateRequestDto): Promise<ProductResponseDto> {
      return apiClient.post<ProductResponseDto>(this.basePath, product);
    }
  
    async updateProduct(id: number, product: Partial<ProductCreateRequestDto>): Promise<ProductResponseDto> {
      return apiClient.put<ProductResponseDto>(`${this.basePath}/${id}`, product);
    }
  
    async deleteProduct(id: number): Promise<void> {
      return apiClient.delete(`${this.basePath}/${id}`);
    }
  
    async updateStock(id: number, stockUpdate: StockUpdateRequestDto): Promise<ProductResponseDto> {
      return apiClient.patch<ProductResponseDto>(`${this.basePath}/${id}/stock`, stockUpdate);
    }
  
    async searchProducts(query: string, page: number = 0, size: number = 20): Promise<PagedResponse<ProductResponseDto>> {
      const params = new URLSearchParams({
        query: query,
        page: page.toString(),
        size: size.toString()
      });
      return apiClient.getPaged<ProductResponseDto>(`${this.basePath}/search?${params.toString()}`);
    }
  }

export const productService = new ProductService();