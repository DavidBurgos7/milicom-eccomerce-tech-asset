import { OrderStatus } from "./OrderStatus";

// OrderStatusHistoryResponse

export interface OrderStatusHistoryResponse {
  id: number;
  previousStatus: OrderStatus;
  previousStatusDisplayName: string;
  newStatus: OrderStatus;
  newStatusDisplayName: string;
  changedBy: string;
  changeReason: string;
  notes: string;
  changedAt: string; // ISO 8601 date string
  statusChangeDescription: string;
}
