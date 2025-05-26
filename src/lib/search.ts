import { mockProducts } from "./data/mocks";
import { ProductSearchResult } from "./models/products/product-search-results";

// Función para generar un slug a partir del nombre del producto
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Eliminar caracteres especiales
    .replace(/\s+/g, '-')      // Reemplazar espacios con guiones
    .replace(/--+/g, '-');     // Eliminar guiones duplicados
}

// Convertir los productos mock al formato necesario para la búsqueda
export const searchProducts: ProductSearchResult[] = mockProducts.map(product => ({
  id: product.id,
  name: product.name,
  slug: generateSlug(product.name),
  price: product.price,
  originalPrice: product.originalPrice,
  image: product.image,
  category: product.category,
  brand: product.brand,
}));

// Función para buscar productos basados en una consulta
export function searchProductsByQuery(query: string): ProductSearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return searchProducts.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) ||
    product.brand.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery)
  );
}