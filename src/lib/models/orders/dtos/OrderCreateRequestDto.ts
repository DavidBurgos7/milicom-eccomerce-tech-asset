import { OrderItemRequestDto } from "./OrderItemRequestDto";

// OrderCreateRequestDto

export interface OrderCreateRequestDto {
  userId: number;
  items: OrderItemRequestDto[];

  // Información de envío
  shippingAddressId?: number;
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;

  // Información adicional
  shippingAmount?: number;
  taxAmount?: number;
  discountAmount?: number;
  customerNotes?: string;
}

// Valores por defecto para OrderCreateRequestDto
export const defaultOrderCreateRequest: Partial<OrderCreateRequestDto> = {
  shippingAmount: 0,
  taxAmount: 0,
  discountAmount: 0
};
