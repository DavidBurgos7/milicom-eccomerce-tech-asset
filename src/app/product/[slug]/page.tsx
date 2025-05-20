"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingCart, Heart, Star, StarHalf, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

// TODO: reemplazar con llamado al API real
const getProductById = (id: string) => {
  // Simular la obtención de un producto de lista de productos
  return {
    id: parseInt(id),
    name: "Nike Air Max 270 React",
    slug: "nike-air-max-270-react",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 234,
    image: "/api/placeholder/400/400",
    category: "Running",
    brand: "Nike",
    isOnSale: true,
    isFeatured: true,
    isNew: false,
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["white", "black", "blue"],
    description: "Zapatillas de running con tecnología de amortiguación avanzada para máximo confort durante tus entrenamientos.",
    details: [
      "Upper: Malla transpirable y materiales sintéticos",
      "Mediasuela: Tecnología Nike Air y React para máxima amortiguación",
      "Suela: Patrón de tracción para superficies variadas",
      "Ajuste: Cordones tradicionales para un ajuste seguro",
      "Uso recomendado: Running y uso casual"
    ]
  };
};

export default function ProductPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Simular la obtención del producto por ID
    const product = getProductById("1"); // Simulación

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor selecciona una talla");
            return;
        }

        if (!selectedColor) {
            alert("Por favor selecciona un color");
            return;
        }

        // TODO: Implementar la lógica para añadir al carrito del cart-store.ts
        console.log("Añadir al carrito:", { 
            product, 
            size: selectedSize, 
            color: selectedColor 
        });
    };

    const handleToggleFavorite = () => {
        // TODO: Implementar logica de agregar a favoritos
        console.log("Toggle favorito:", product);
    };

    // Renderizar estrellas basadas en el rating
    const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }

    if (hasHalfStar) {
        stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-star-${i}`} className="text-gray-300 h-5 w-5" />);
    }

    return stars;
    };

    // Mapeo de colores a clases de Tailwind
    const colorClasses: Record<string, string> = {
        white: "bg-white border-gray-200",
        black: "bg-black",
        blue: "bg-blue-600",
        red: "bg-red-600",
        yellow: "bg-yellow-400",
        green: "bg-green-500",
        orange: "bg-orange-500",
        purple: "bg-purple-600",
        pink: "bg-pink-500",
        gray: "bg-gray-500",
        brown: "bg-amber-800",
        navy: "bg-indigo-900"
    };

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <p className="mb-8">Lo sentimos, el producto que buscas no existe o ha sido removido.</p>
                <Button onClick={() => router.push("/")}>
                    Volver a la tienda
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Inicio
                    </Link>
                    </li>
                    <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link 
                        href={`/${product.category.toLowerCase()}`} 
                        className="ml-1 text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                        {product.category}
                    </Link>
                    </li>
                    <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="ml-1 text-sm font-medium text-foreground">
                        {product.name}
                    </span>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Imagen del producto */}
                <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                    {product.isOnSale && (
                    <Badge className="absolute top-4 left-4 z-10 bg-destructive hover:bg-destructive">
                        -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                    </Badge>
                    )}
                    
                    {product.isNew && (
                    <Badge className="absolute top-4 left-4 z-10 bg-green-500 hover:bg-green-600">
                        Nuevo
                    </Badge>
                    )}

                    <div className="aspect-square relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    </div>
                    
                    <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={() => {}}
                    >
                    <Eye className="h-5 w-5" />
                    </Button>
                </div>

                {/* Información del producto */}
                <div>
                    {/* Categoría y marca */}
                    <div className="mb-2">
                    <Link 
                        href={`/${product.category.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider"
                    >
                        {product.category}
                    </Link>
                    {" • "}
                    <Link 
                        href={`/marcas/${product.brand.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider"
                    >
                        {product.brand}
                    </Link>
                    </div>

                    {/* Nombre del producto */}
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    {/* Descripción */}
                    <p className="mb-6 text-muted-foreground">{product.description}</p>

                    {/* Estrellas y reseñas */}
                    <div className="flex items-center mb-6">
                    <div className="flex mr-2">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="mx-1 text-muted-foreground">•</span>
                    <Link href="#reviews" className="text-sm text-muted-foreground hover:text-primary">
                        {product.reviewCount} reseñas
                    </Link>
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-primary">
                        {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                        <span className="ml-2 text-xl text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                        )}
                    </div>
                    </div>

                    {/* Colores */}
                    <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Colores:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.colors?.map((color) => (
                        <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color
                                ? "ring-2 ring-primary ring-offset-2"
                                : ""
                            } ${colorClasses[color] || "bg-gray-200"}`}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Color ${color}`}
                        />
                        ))}
                    </div>
                    </div>

                    {/* Tallas */}
                    <div className="mb-8">
                    <h3 className="text-sm font-medium mb-3">Tallas:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes?.map((size) => (
                        <button
                            key={size}
                            className={`h-10 min-w-[2.5rem] px-3 rounded border ${
                            selectedSize === size
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background hover:bg-accent border-input"
                            }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4">
                    <Button 
                        onClick={handleAddToCart}
                        className="flex-1"
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Agregar al carrito
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleFavorite}
                    >
                        <Heart className="h-5 w-5" />
                    </Button>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-8 flex items-center space-x-8 text-sm">
                    <div className="flex items-center">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Envío gratis</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>30 días devolución</span>
                    </div>
                    </div>
                </div>
            </div>

            {/* Tabs con detalles adicionales */}
            <Tabs defaultValue="details" className="mb-12">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                    <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                    <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-6">
                    <div className="space-y-4">
                    <h3 className="text-lg font-medium">Acerca de este producto</h3>
                    <p>{product.description}</p>
                    <ul className="space-y-2 mt-4">
                        {product.details?.map((detail, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{detail}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                </TabsContent>
                <TabsContent value="specifications" className="pt-6">
                    <div className="space-y-4">
                    <h3 className="text-lg font-medium">Especificaciones técnicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Marca</span>
                        <p className="font-medium">{product.brand}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Categoría</span>
                        <p className="font-medium">{product.category}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Colores disponibles</span>
                        <p className="font-medium capitalize">{product.colors?.join(", ")}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Tallas disponibles</span>
                        <p className="font-medium">{product.sizes?.join(", ")}</p>
                        </div>
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-6" id="reviews">
                    <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Reseñas de clientes</h3>
                        <Button variant="outline">Escribir reseña</Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-center">
                        <div className="text-4xl font-bold">{product.rating}</div>
                        <div className="flex justify-center mt-1">
                            {renderStars(product.rating)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                            {product.reviewCount} reseñas
                        </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                        {/* Barras de progreso simuladas para las reseñas */}
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center">
                            <span className="text-sm w-6">{star}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                className="h-full bg-yellow-400 rounded-full" 
                                style={{ 
                                    width: `${star === Math.round(product.rating) ? "60%" : 
                                            star > Math.round(product.rating) ? "10%" : "30%"}` 
                                }} 
                                />
                            </div>
                            <span className="text-sm text-muted-foreground ml-2 w-8">
                                {star === Math.round(product.rating) ? "60%" : 
                                star > Math.round(product.rating) ? "10%" : "30%"}
                            </span>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                    {/* Ejemplo de reseñas */}
                    <div className="space-y-6 mt-8">
                        {/* Aquí irían las reseñas reales de los usuarios */}
                        <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                            <div className="font-medium">Cliente Satisfecho</div>
                            <div className="text-sm text-muted-foreground">Hace 2 semanas</div>
                        </div>
                        <div className="flex mb-2">
                            {renderStars(5)}
                        </div>
                        <p>Excelente producto. La amortiguación es perfecta para mis entrenamientos diarios y el diseño es muy atractivo. 100% recomendado.</p>
                        </div>
                        
                        <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                            <div className="font-medium">Runner Habitual</div>
                            <div className="text-sm text-muted-foreground">Hace 1 mes</div>
                        </div>
                        <div className="flex mb-2">
                            {renderStars(4)}
                        </div>
                        <p>Muy buen calzado para running. Cómodo y ligero. Le quito una estrella porque tarda un poco en adaptarse al pie los primeros días.</p>
                        </div>
                    </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Productos relacionados */}
            <div className="my-12">
                <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Aquí irían los productos relacionados - mostrar solo como ejemplo */}
                    {/* Estos deberían ser productos reales de tu base de datos */}
                    {Array(4).fill(null).map((_, index) => (
                    <div key={index} className="border rounded-md overflow-hidden bg-background">
                        <div className="aspect-square relative">
                        <Image
                            src="/api/placeholder/400/400"
                            alt="Producto relacionado"
                            fill
                            className="object-contain p-4"
                        />
                        </div>
                        <div className="p-4">
                        <h3 className="text-sm font-medium line-clamp-2">
                            Producto relacionado {index + 1}
                        </h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-primary font-medium">
                            {formatPrice(79.99 + index * 10)}
                            </span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}