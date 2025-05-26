import { StockOperation } from "./StockOperation";

// StockUpdateRequestDto

export interface StockUpdateRequestDto {
    quantity: number;
    operation: StockOperation;
}
