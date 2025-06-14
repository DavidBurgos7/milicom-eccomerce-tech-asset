import { OrderCreateRequestDto } from '@/lib/models/orders/dtos/OrderCreateRequestDto';
import { OrderResponseDto } from '@/lib/models/orders/dtos/OrderResponseDto';
import { OrderStatusUpdateRequestDto } from '@/lib/models/orders/dtos/OrderStatusUpdateRequestDto';
import { OrderUpdateRequestDto } from '@/lib/models/orders/dtos/OrderUpdateRequestDto';
import { apiClient } from '../lib/api';
import { PagedResponse } from '@/lib/models/api/PagedResponse';

export class OrderService {
  private readonly basePath = '/api/orders';

  async getOrders(userId?: number): Promise<PagedResponse<OrderResponseDto>> {
    const url = userId ? `${this.basePath}?userId=${userId}` : this.basePath;
    return apiClient.getPaged<OrderResponseDto>(url);
  }

  async getOrder(id: number): Promise<OrderResponseDto> {
    return apiClient.get<OrderResponseDto>(`${this.basePath}/${id}`);
  }

  async createOrder(order: OrderCreateRequestDto): Promise<OrderResponseDto> {
    return apiClient.post<OrderResponseDto>(this.basePath, order);
  }

  async updateOrder(id: number, order: OrderUpdateRequestDto): Promise<OrderResponseDto> {
    return apiClient.put<OrderResponseDto>(`${this.basePath}/${id}`, order);
  }

  async updateOrderStatus(id: number, statusUpdate: OrderStatusUpdateRequestDto): Promise<OrderResponseDto> {
    return apiClient.patch<OrderResponseDto>(`${this.basePath}/${id}/status`, statusUpdate);
  }

  async cancelOrder(id: number, reason?: string): Promise<OrderResponseDto> {
    return apiClient.patch<OrderResponseDto>(`${this.basePath}/${id}/cancel`, { reason });
  }

  async getUserOrders(userId: number): Promise<PagedResponse<OrderResponseDto>>{
    return apiClient.getPaged<OrderResponseDto>(`${this.basePath}/user/${userId}`);
  }

  async getUserOrdersContent(userId: number): Promise<OrderResponseDto[]> {
    const orders = await this.getUserOrders(userId);
    return orders.content;
  }
}

export const orderService = new OrderService();