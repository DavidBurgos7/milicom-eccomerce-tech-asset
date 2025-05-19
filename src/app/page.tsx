"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { HeroCarousel } from "@/components/hero-carousel";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/models/product";

export default function HomePage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  // Datos de ejemplo para productos destacados
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Nike Air Max 270 React",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviewCount: 234,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "Nike",
      isOnSale: true,
      isFeatured: true,
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["white", "black", "blue"],
      description: "Zapatillas de running con tecnología de amortiguación avanzada para máximo confort durante tus entrenamientos."
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: 89.99,
      rating: 4.8,
      reviewCount: 567,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "Adidas",
      isNew: true,
      isFeatured: true,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["black", "white", "gray"],
      description: "La evolución del running con tecnología Boost para una respuesta energética incomparable."
    },
    {
      id: 3,
      name: "Under Armour HOVR Phantom 3",
      price: 99.99,
      originalPrice: 119.99,
      rating: 4.3,
      reviewCount: 189,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "Under Armour",
      isOnSale: true,
      isFeatured: true,
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["red", "blue", "black"],
      description: "Tecnología HOVR que proporciona retorno de energía y elimina el impacto."
    },
    {
      id: 4,
      name: "Puma RS-X Reinvention",
      price: 79.99,
      rating: 4.1,
      reviewCount: 145,
      image: "/api/placeholder/400/400",
      category: "Lifestyle",
      brand: "Puma",
      isNew: true,
      isFeatured: true,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["yellow", "black", "white"],
      description: "Diseño retro-futurista que combina style y funcionalidad para uso diario."
    }
  ];

  // Datos de ejemplo para todos los productos
  const allProducts: Product[] = [
    {
      id: 5,
      name: "Nike Dri-FIT Running Shirt",
      price: 24.99,
      rating: 4.2,
      reviewCount: 89,
      image: "/api/placeholder/400/400",
      category: "Ropa",
      brand: "Nike",
      sizes: ["S", "M", "L", "XL"],
      colors: ["black", "white", "blue"]
    },
    {
      id: 6,
      name: "Adidas Predator Edge.1 FG",
      price: 199.99,
      originalPrice: 229.99,
      rating: 4.7,
      reviewCount: 156,
      image: "/api/placeholder/400/400",
      category: "Fútbol",
      brand: "Adidas",
      isOnSale: true,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["black", "white"]
    },
    {
      id: 7,
      name: "Wilson NBA Official Basketball",
      price: 29.99,
      rating: 4.6,
      reviewCount: 234,
      image: "/api/placeholder/400/400",
      category: "Basquetbol",
      brand: "Wilson",
      colors: ["orange"]
    },
    {
      id: 8,
      name: "Reebok CrossFit Nano X2",
      price: 119.99,
      rating: 4.4,
      reviewCount: 178,
      image: "/api/placeholder/400/400",
      category: "Fitness",
      brand: "Reebok",
      isNew: true,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["black", "white", "red"]
    },
    {
      id: 9,
      name: "New Balance Fresh Foam X",
      price: 149.99,
      rating: 4.3,
      reviewCount: 267,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "New Balance",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["gray", "blue", "black"]
    },
    {
      id: 10,
      name: "Asics Gel-Kayano 29",
      price: 159.99,
      originalPrice: 179.99,
      rating: 4.5,
      reviewCount: 312,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "Asics",
      isOnSale: true,
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["blue", "black", "white"]
    },
    {
      id: 11,
      name: "Converse Chuck Taylor All Star",
      price: 54.99,
      rating: 4.1,
      reviewCount: 445,
      image: "/api/placeholder/400/400",
      category: "Lifestyle",
      brand: "Converse",
      sizes: ["5", "6", "7", "8", "9", "10", "11"],
      colors: ["black", "white", "red", "blue"]
    },
    {
      id: 12,
      name: "Nike Pro Combat Shorts",
      price: 34.99,
      rating: 4.0,
      reviewCount: 123,
      image: "/api/placeholder/400/400",
      category: "Ropa",
      brand: "Nike",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["black", "gray", "navy"]
    },
    {
      id: 13,
      name: "Puma Future Z 1.1 FG/AG",
      price: 169.99,
      rating: 4.2,
      reviewCount: 98,
      image: "/api/placeholder/400/400",
      category: "Fútbol",
      brand: "Puma",
      isNew: true,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["blue", "yellow", "black"]
    },
    {
      id: 14,
      name: "Under Armour HeatGear Polo",
      price: 44.99,
      originalPrice: 54.99,
      rating: 4.3,
      reviewCount: 167,
      image: "/api/placeholder/400/400",
      category: "Ropa",
      brand: "Under Armour",
      isOnSale: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["white", "black", "navy", "red"]
    },
    {
      id: 15,
      name: "Adidas Tiro 21 Training Pants",
      price: 49.99,
      rating: 4.4,
      reviewCount: 203,
      image: "/api/placeholder/400/400",
      category: "Ropa",
      brand: "Adidas",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["black", "navy", "gray"]
    },
    {
      id: 16,
      name: "Nike Air Jordan 1 Mid",
      price: 109.99,
      rating: 4.6,
      reviewCount: 389,
      image: "/api/placeholder/400/400",
      category: "Basquetbol",
      brand: "Nike",
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["black", "white", "red"]
    },
    {
      id: 17,
      name: "Reebok Classic Leather",
      price: 64.99,
      originalPrice: 79.99,
      rating: 4.2,
      reviewCount: 234,
      image: "/api/placeholder/400/400",
      category: "Lifestyle",
      brand: "Reebok",
      isOnSale: true,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["white", "black", "brown"]
    },
    {
      id: 18,
      name: "New Balance 990v5",
      price: 174.99,
      rating: 4.7,
      reviewCount: 156,
      image: "/api/placeholder/400/400",
      category: "Lifestyle",
      brand: "New Balance",
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["gray", "navy", "black"]
    },
    {
      id: 19,
      name: "Asics Gel-Nimbus 24",
      price: 149.99,
      rating: 4.5,
      reviewCount: 278,
      image: "/api/placeholder/400/400",
      category: "Running",
      brand: "Asics",
      isNew: true,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["blue", "black", "white", "pink"]
    },
    {
      id: 20,
      name: "Puma Suede Classic",
      price: 69.99,
      rating: 4.3,
      reviewCount: 345,
      image: "/api/placeholder/400/400",
      category: "Lifestyle",
      brand: "Puma",
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["blue", "red", "black", "green"]
    }
  ];

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Aquí implementarías la lógica de filtrado
    console.log("Filtros actualizados:", newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <HeroCarousel products={featuredProducts} />

        <Separator className="my-12" />

        {/* Featured Products Section with Carousel */}
        <ProductCarousel
          products={featuredProducts}
          title="Productos Destacados"
          showViewAll={true}
          autoplay={true}
        />

        <Separator className="my-12" />

        {/* All Products Section with Filters */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Todos los Productos</h2>
            <div className="text-sm text-muted-foreground">
              {allProducts.length} productos encontrados
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-1">
              <FilterBar
                isVisible={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination or Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Cargar más productos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 rounded-lg bg-slate-50 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Recibe las últimas novedades, ofertas exclusivas y consejos deportivos
            directamente en tu correo electrónico.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              Suscribirse
            </Button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">SportStore</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about">Sobre nosotros</a></li>
                <li><a href="/stores">Nuestras tiendas</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Ayuda</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/shipping">Envíos</a></li>
                <li><a href="/returns">Devoluciones</a></li>
                <li><a href="/contact">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Políticas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy">Privacidad</a></li>
                <li><a href="/terms">Términos</a></li>
                <li><a href="/cookies">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Síguenos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            © 2025 SportStore. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}