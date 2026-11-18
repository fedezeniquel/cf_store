"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { Save, Search, RefreshCw, CheckCircle2 } from "lucide-react";

interface FlattenedRow {
  productId: string;
  productTitle: string;
  categoryName: string;
  variantId: string;
  variantName: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  isModified: boolean;
}

interface InventoryTableProps {
  initialProducts: Product[];
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ initialProducts }) => {
  // Aplanamos productos a filas por variante
  const buildRows = (): FlattenedRow[] => {
    const list: FlattenedRow[] = [];
    initialProducts.forEach((product) => {
      (product.variants || []).forEach((variant) => {
        list.push({
          productId: product.id,
          productTitle: product.title,
          categoryName: product.category?.name || "Sin categoría",
          variantId: variant.id,
          variantName: variant.variant_name,
          price: variant.price,
          stock: variant.stock,
          lowStockThreshold: variant.low_stock_threshold,
          isModified: false,
        });
      });
    });
    return list;
  };

  const [rows, setRows] = useState<FlattenedRow[]>(buildRows);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePriceChange = (variantId: string, value: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? { ...r, price: Math.max(0, value), isModified: true }
          : r
      )
    );
  };

  const handleStockChange = (variantId: string, value: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? { ...r, stock: Math.max(0, value), isModified: true }
          : r
      )
    );
  };

  const handleThresholdChange = (variantId: string, value: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? { ...r, lowStockThreshold: Math.max(0, value), isModified: true }
          : r
      )
    );
  };

  const handleSaveAll = () => {
    setSaving(true);
    // Simulación de persistencia (aquí se llamará a Supabase en la fase de backend)
    setTimeout(() => {
      setRows((prev) => prev.map((r) => ({ ...r, isModified: false })));
      setSaving(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 500);
  };

  const modifiedCount = rows.filter((r) => r.isModified).length;

  const filteredRows = rows.filter((r) => {
    const q = search.toLowerCase().trim();
    return (
      q === "" ||
      r.productTitle.toLowerCase().includes(q) ||
      r.variantName.toLowerCase().includes(q) ||
      r.categoryName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Barra de control superior */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-standard absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por producto, variante o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-body bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest"
          />
        </div>

        <div className="flex items-center gap-3 justify-end">
          {successMsg && (
            <span className="text-xs font-heading font-medium text-emerald-700 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              ¡Cambios guardados con éxito!
            </span>
          )}

          <Button
            variant="primary"
            size="md"
            disabled={modifiedCount === 0 || saving}
            onClick={handleSaveAll}
            className="gap-2"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {saving
                ? "Guardando..."
                : `Guardar cambios ${modifiedCount > 0 ? `(${modifiedCount})` : ""}`}
            </span>
          </Button>
        </div>
      </div>

      {/* Tabla masiva de inventario */}
      <div className="bg-base-white border border-silver rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-cf-forest text-white font-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Producto</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Variante</th>
                <th className="py-3 px-4 w-36">Precio ($)</th>
                <th className="py-3 px-4 w-32">Stock (un.)</th>
                <th className="py-3 px-4 w-32">Umbral Alerta</th>
                <th className="py-3 px-4 text-center w-28">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver/40 text-dark">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-standard">
                    No se encontraron productos o variantes con ese criterio.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const isLow = row.stock <= row.lowStockThreshold;
                  const isZero = row.stock === 0;

                  return (
                    <tr
                      key={row.variantId}
                      className={`hover:bg-zinc-50 transition-colors ${
                        row.isModified ? "bg-amber-50/40" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-heading font-bold text-dark">
                        {row.productTitle}
                      </td>
                      <td className="py-3 px-4 text-standard">
                        {row.categoryName}
                      </td>
                      <td className="py-3 px-4 font-medium text-dark">
                        {row.variantName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-standard">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={row.price}
                            onChange={(e) =>
                              handlePriceChange(
                                row.variantId,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full pl-6 pr-2 py-1.5 text-xs font-heading font-bold bg-white border border-silver rounded focus:outline-none focus:border-cf-forest text-dark"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={row.stock}
                          onChange={(e) =>
                            handleStockChange(
                              row.variantId,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className={`w-full px-2.5 py-1.5 text-xs font-heading font-bold bg-white border rounded focus:outline-none focus:border-cf-forest ${
                            isZero
                              ? "border-cf-wine text-cf-wine"
                              : isLow
                              ? "border-amber-400 text-amber-900"
                              : "border-silver text-dark"
                          }`}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={row.lowStockThreshold}
                          onChange={(e) =>
                            handleThresholdChange(
                              row.variantId,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full px-2.5 py-1.5 text-xs font-body bg-white border border-silver rounded focus:outline-none focus:border-cf-forest text-standard"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isZero ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-heading font-bold bg-cf-wine text-white">
                            Agotado
                          </span>
                        ) : isLow ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-heading font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Bajo Stock
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-heading font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Normal
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
