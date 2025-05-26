import { OrderItemResponseDto } from "./OrderItemResponseDto";
import { OrderStatusHistoryResponse } from "./OrderStatusHistoryResponse";
import { OrderStatus } from "./OrderStatus";

// OrderResponseDto

export interface OrderResponseDto {
  id: number;
  orderNumber: string;
  userId: number;
  status: OrderStatus;
  statusDisplayName: string;

  // Montos
  totalAmount: number;
  shippingAmount: number;
  taxAmount: number;
  discountAmount: number;
  subtotal: number;

  // Información de envío
  shippingAddressId: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;

  // Información adicional
  customerNotes: string;
  adminNotes: string;
  estimatedDeliveryDate: string; // ISO 8601 date string
  actualDeliveryDate: string; // ISO 8601 date string


  // Items y historial
  items: OrderItemResponseDto[];
  statusHistory: OrderStatusHistoryResponse[];

  // Estados
  isEditable: boolean;
  isCancellable: boolean;

  // Fechas
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
