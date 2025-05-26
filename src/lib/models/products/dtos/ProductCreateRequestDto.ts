import { ProductColorRequestDto } from "./ProductColorRequestDto";

// ProductCreateRequestDto

export interface ProductCreateRequestDto {
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    category: string;
    brand: string;
    imageUrl?: string;
    sizes?: string[];
    colors?: ProductColorRequestDto[];
}
