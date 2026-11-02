"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import { VirolaSelector } from "./VirolaSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  // Variantes disponibles o default
  const variants = product.variants || [];
  const defaultVariant = variants.find((v) => v.stock > 0) || variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    defaultVariant
  );

  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;
  const isMultipleVariants = variants.length > 1;

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      imageUrl: product.image_url,
      variantId: selectedVariant.id,
      variantName: selectedVariant.variant_name,
      price: selectedVariant.price,
      quantity: 1,
      maxStock: selectedVariant.stock,
    });
  };

  const currentPrice = selectedVariant ? selectedVariant.price : 0;

  return (
    <div className="group flex flex-col bg-base-white border border-silver rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-standard text-xs font-body">
            Sin Imagen
          </div>
        )}

        {/* Badge de Categoría */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <Badge variant="forest">{product.category.name}</Badge>
          </div>
        )}

        {/* Badge de Agotado */}
        {isOutOfStock && (
          <div className="absolute top-3 right-3">
            <Badge variant="wine">Agotado</Badge>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <Link href={`/productos/${product.slug}`}>
            <h3 className="font-heading font-bold text-lg text-dark hover:text-cf-wine transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {product.description && (
            <p className="mt-1 text-standard text-xs font-body line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Selector de variantes/virola si corresponde */}
        {isMultipleVariants && selectedVariant && (
          <div className="pt-1">
            <VirolaSelector
              variants={variants}
              selectedVariantId={selectedVariant.id}
              onSelectVariant={(variant) => setSelectedVariant(variant)}
            />
          </div>
        )}

        {/* Precio y CTA */}
        <div className="pt-2 border-t border-silver/50 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-body text-standard uppercase block">
              Precio
            </span>
            <span className="font-heading font-bold text-xl text-dark">
              ${currentPrice.toLocaleString("es-AR")}
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? "Agotado" : "Agregar"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

