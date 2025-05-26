import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../models/products/product';

interface StockStore {
    products: Product[];
    fetchProducts: () => Promise<void>;
    setProducts: (products: Product[]) => void;
}

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      products: [],
      fetchProducts: async () => {
        try {
          const response = await fetch('/api/products');
          const data: Product[] = await response.json();
          set({ products: data });
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      },
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'stock-storage',
    }
  )
);