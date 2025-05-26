import { OrderStatus } from "./OrderStatus";

// OrderStatusUpdateRequestDto

export interface OrderStatusUpdateRequestDto {
  newStatus: OrderStatus;
  changeReason?: string;
  notes?: string;
  changedBy?: string;
}
