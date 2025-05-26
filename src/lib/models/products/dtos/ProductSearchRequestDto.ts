// ProductSearchRequestDto
export interface ProductSearchRequestDto {
    query?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    onlyAvailable?: boolean;
    sortBy?: string;
    sortDirection?: string;
    page?: number;
    size?: number;
}

// Opcional: Valores por defecto para ProductSearchRequestDto
export const defaultProductSearchRequest: Partial<ProductSearchRequestDto> = {
    onlyAvailable: true,
    sortBy: 'name',
    sortDirection: 'asc',
    page: 0,
    size: 20
};
