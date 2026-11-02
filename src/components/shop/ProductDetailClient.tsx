"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import { VirolaSelector } from "@/components/shop/VirolaSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
}) => {
  const variants = product.variants || [];
  const defaultVariant = variants.find((v) => v.stock > 0) || variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    defaultVariant
  );
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;
  const maxStock = selectedVariant ? selectedVariant.stock : 0;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const handleQuantityMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityPlus = () => {
    if (quantity < maxStock) setQuantity(quantity + 1);
  };

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
      quantity,
      maxStock: selectedVariant.stock,
    });
  };

  const currentPrice = selectedVariant ? selectedVariant.price : 0;

  return (
    <div className="space-y-10">
      {/* Navegación Breadcrumb / Volver */}
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-xs font-heading font-medium text-standard hover:text-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Imagen del Producto */}
        <div className="relative aspect-square w-full rounded-xl bg-zinc-100 border border-silver overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-standard text-sm font-body">
              Fotografía artesanal en preparación
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-4 right-4">
              <Badge variant="wine">Sin Stock</Badge>
            </div>
          )}
        </div>

        {/* Ficha Técnica y Acciones de Compra */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {product.category && (
              <Badge variant="forest">{product.category.name}</Badge>
            )}

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-dark">
              {product.title}
            </h1>

            {/* Precio */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-bold text-dark">
                ${currentPrice.toLocaleString("es-AR")}
              </span>
              <span className="text-xs font-body text-standard">
                (Precio final por unidad)
              </span>
            </div>

            {/* Descripción */}
            {product.description && (
              <p className="text-standard font-body text-sm sm:text-base leading-relaxed pt-2 border-t border-silver/50">
                {product.description}
              </p>
            )}

            {/* Selector de Virola / Variante */}
            {variants.length > 0 && selectedVariant && (
              <div className="pt-3">
                <VirolaSelector
                  variants={variants}
                  selectedVariantId={selectedVariant.id}
                  onSelectVariant={handleVariantChange}
                />
              </div>
            )}

            {/* Estado de Stock de la variante */}
            <div className="text-xs font-body pt-1">
              {isOutOfStock ? (
                <span className="text-cf-wine font-medium">
                  Esta variante se encuentra actualmente agotada.
                </span>
              ) : selectedVariant && selectedVariant.stock <= selectedVariant.low_stock_threshold ? (
                <span className="text-gold font-bold">
                  ¡Últimas {selectedVariant.stock} unidades disponibles!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Stock disponible ({selectedVariant?.stock} unidades)
                </span>
              )}
            </div>

            {/* Control de Cantidad y Agregar al Carrito */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              {/* Selector de Cantidad */}
              <div className="flex items-center justify-between sm:justify-start border border-silver rounded-md bg-base-white px-3 py-2 w-full sm:w-36">
                <button
                  type="button"
                  disabled={quantity <= 1 || isOutOfStock}
                  onClick={handleQuantityMinus}
                  className="p-1 hover:bg-zinc-100 text-dark disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-heading font-bold text-dark">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= maxStock || isOutOfStock}
                  onClick={handleQuantityPlus}
                  className="p-1 hover:bg-zinc-100 text-dark disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Botón CTA Agregar al Carrito */}
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex-1 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {isOutOfStock ? "Variante Agotada" : "Agregar al Carrito"}
                </span>
              </Button>
            </div>
          </div>

          {/* Garantías de Marca */}
          <div className="p-4 bg-zinc-50 border border-silver/50 rounded-lg space-y-3">
            <div className="flex items-center gap-3 text-xs font-body text-dark">
              <Truck className="w-4 h-4 text-cf-forest shrink-0" />
              <span>
                <strong>Coordinación directa de envío:</strong> Andreani, correo o retiro personal vía WhatsApp.
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-body text-dark">
              <ShieldCheck className="w-4 h-4 text-cf-forest shrink-0" />
              <span>
                <strong>Garantía de calidad:</strong> Elaboración artesanal y control minucioso antes de cada despacho.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

