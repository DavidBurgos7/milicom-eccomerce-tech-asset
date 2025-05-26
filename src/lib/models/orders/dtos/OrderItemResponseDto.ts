// OrderItemResponseDto

export interface OrderItemResponseDto {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productSize: string;
  productColor: string;
  productImageUrl: string;
  productDescription: string;
}
