import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../models/products/product';
import { generateSlug } from '../utils';

interface StockStore {
    products: Product[];
    fetchProducts: () => Promise<void>;
    setProducts: (products: Product[]) => void;
    getProductBySlug: (slug: string) => Product | undefined;
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
      setProducts: (products) => {
        products.map(product => {
          if (!product.slug) {
            product.slug = generateSlug(product.name);
          }
        });

        set({ products })
      },
      getProductBySlug: (slug) => {
        return get().products.find(product => product.slug === slug);
      }
    }),
    {
      name: 'stock-storage',
    }
  )
);