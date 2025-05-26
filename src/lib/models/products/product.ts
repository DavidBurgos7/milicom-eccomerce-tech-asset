export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  brand: string;
  isOnSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  sizes?: string[];
  colors?: string[];
  description?: string;
}