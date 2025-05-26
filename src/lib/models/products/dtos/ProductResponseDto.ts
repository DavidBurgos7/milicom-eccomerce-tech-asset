import { ProductSizeResponseDto } from "./ProductSizeResponseDto";
import { ProductColorResponseDto } from "./ProductColorResponseDto";

// ProductResponseDto

export interface ProductResponseDto {
    id: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    category: string;
    brand: string;
    imageUrl: string;
    active: boolean;
    available: boolean;
    sizes: ProductSizeResponseDto[];
    colors: ProductColorResponseDto[];
    isFavorite: boolean;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string

    //TODO: Add this on API calls
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
}
