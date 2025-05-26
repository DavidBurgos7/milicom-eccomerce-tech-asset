// OrderItemRequestDto

export interface OrderItemRequestDto {
  productId: number;
  quantity: number;
  unitPrice: number;
  productSize?: string;
  productColor?: string;
  productName?: string;
  productSku?: string;
  productImageUrl?: string;
  productDescription?: string;
}
