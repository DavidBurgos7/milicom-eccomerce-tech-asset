// OrderUpdateRequestDto

export interface OrderUpdateRequestDto {
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingAmount?: number;
  taxAmount?: number;
  discountAmount?: number;
  customerNotes?: string;
  estimatedDeliveryDate?: string; // ISO 8601 date string
}
