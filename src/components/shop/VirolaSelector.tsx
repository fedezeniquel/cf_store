"use client";

import { ProductVariant } from "@/types/database";

interface VirolaSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VirolaSelector: React.FC<VirolaSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-heading font-bold text-dark uppercase tracking-wider">
        Variante / Virola:
      </label>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isOutOfStock = variant.stock <= 0;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectVariant(variant)}
              className={`px-3 py-2 text-xs font-heading font-medium rounded-md border transition-all cursor-pointer ${
                isSelected
                  ? "border-cf-forest bg-cf-forest text-white shadow-sm"
                  : isOutOfStock
                  ? "border-silver bg-zinc-100 text-silver/60 cursor-not-allowed line-through"
                  : "border-silver bg-base-white text-dark hover:border-cf-forest"
              }`}
            >
              <span>{variant.variant_name}</span>
              {isOutOfStock ? (
                <span className="ml-1.5 text-[10px] text-cf-wine">(Sin Stock)</span>
              ) : (
                <span
                  className={`ml-1.5 text-[10px] ${
                    isSelected ? "text-gold" : "text-standard"
                  }`}
                >
                  ${variant.price.toLocaleString("es-AR")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

