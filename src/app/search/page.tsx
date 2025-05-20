"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchProductsByQuery } from "@/lib/search";
import { formatPrice } from "@/lib/utils";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  
  // Obtener resultados de búsqueda usando nuestra función
  const searchResults = searchProductsByQuery(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Recargar la página con la nueva consulta de búsqueda
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Inicio
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="ml-1 text-sm font-medium text-foreground">
                Resultados de búsqueda
              </span>
            </li>
          </ol>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Resultados para "{query}"
          </h1>
          <p className="text-muted-foreground">
            Se encontraron {searchResults.length} productos
          </p>
        </div>

        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 w-full"
            />
            <Button 
              type="submit" 
              className="absolute right-0 top-0 bottom-0 rounded-l-none"
            >
              Buscar
            </Button>
          </form>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group border rounded-md overflow-hidden bg-background hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-primary font-medium">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through ml-2 text-sm">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.brand} • {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-md bg-background">
          <h2 className="text-xl font-medium mb-2">No se encontraron resultados</h2>
          <p className="text-muted-foreground mb-6">
            No se encontraron productos que coincidan con "{query}".
          </p>
          <Link href="/" className="text-primary hover:underline">
            Volver a la página principal
          </Link>
        </div>
      )}
    </div>
  );
}