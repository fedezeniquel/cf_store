import React from "react";
import Link from "next/link";
import { ProductVariant } from "@/types/database";
import { AlertTriangle, ArrowRight, Package } from "lucide-react";

export interface LowStockItem {
  productTitle: string;
  variant: ProductVariant;
}

interface LowStockAlertProps {
  items: LowStockItem[];
}

export const LowStockAlert: React.FC<LowStockAlertProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <Package className="w-4 h-4 text-emerald-700" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm text-emerald-900">
            Niveles de inventario óptimos
          </h4>
          <p className="text-xs font-body text-emerald-700">
            No hay productos ni variantes por debajo del umbral mínimo de stock.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-amber-950">
              Alertas de Stock Bajo ({items.length})
            </h3>
            <p className="text-xs font-body text-amber-800">
              Las siguientes variantes alcanzaron o están por debajo de su umbral mínimo de reposición.
            </p>
          </div>
        </div>

        <Link
          href="/admin/inventario"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-heading font-bold text-cf-forest hover:text-cf-wine transition-colors"
        >
          <span>Ir a actualizar stock</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-amber-200/60 bg-base-white rounded-md border border-amber-200 overflow-hidden">
        {items.map(({ productTitle, variant }) => {
          const isZeroStock = variant.stock === 0;

          return (
            <div
              key={variant.id}
              className="px-4 py-3 flex items-center justify-between text-xs font-body gap-3 hover:bg-amber-50/50 transition-colors"
            >
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-dark block text-sm">
                  {productTitle}
                </span>
                <span className="text-standard">
                  Variante: <strong>{variant.variant_name}</strong> · Umbral mínimo: {variant.low_stock_threshold} un.
                </span>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-heading font-bold ${
                    isZeroStock
                      ? "bg-cf-wine text-white"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  {isZeroStock ? "Agotado (0 un.)" : `${variant.stock} restantes`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
