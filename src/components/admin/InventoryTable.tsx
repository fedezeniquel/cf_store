"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Save,
  Search,
  RefreshCw,
  CheckCircle2,
  Trash2,
  Edit,
  X,
  AlertTriangle,
  Plus,
} from "lucide-react";

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

export const InventoryTable: React.FC<InventoryTableProps> = ({
  initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Aplanamos productos a filas por variante
  const buildRows = (prods: Product[]): FlattenedRow[] => {
    const list: FlattenedRow[] = [];
    prods.forEach((product) => {
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

  const [rows, setRows] = useState<FlattenedRow[]>(() => buildRows(initialProducts));
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Estados para Modal de Edición
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVariants, setEditVariants] = useState<ProductVariant[]>([]);

  // Estados para Modal de Confirmación de Eliminación
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

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
    setTimeout(() => {
      setRows((prev) => prev.map((r) => ({ ...r, isModified: false })));
      setSaving(false);
      setSuccessMsg("¡Inventario actualizado con éxito!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 500);
  };

  // Abrir modal de edición
  const handleOpenEdit = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setEditingProduct(prod);
    setEditTitle(prod.title);
    setEditDescription(prod.description || "");
    setEditVariants(JSON.parse(JSON.stringify(prod.variants || [])));
  };

  // Guardar edición del producto completo
  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProducts = products.map((p) => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          title: editTitle,
          description: editDescription,
          variants: editVariants,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    setRows(buildRows(updatedProducts));
    setEditingProduct(null);
    setSuccessMsg(`"${editTitle}" se actualizó correctamente.`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // Confirmar y eliminar producto
  const handleConfirmDelete = () => {
    if (!deletingProduct) return;

    const updatedProducts = products.filter((p) => p.id !== deletingProduct.id);
    setProducts(updatedProducts);
    setRows(buildRows(updatedProducts));
    const deletedName = deletingProduct.title;
    setDeletingProduct(null);
    setSuccessMsg(`Se eliminó "${deletedName}" del catálogo.`);
    setTimeout(() => setSuccessMsg(null), 3500);
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
              {successMsg}
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
                <th className="py-3 px-4 text-center w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver/40 text-dark">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-standard">
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
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(row.productId)}
                            className="p-1 rounded text-standard hover:text-cf-forest hover:bg-zinc-100 transition-colors"
                            title="Editar ficha del producto"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const p = products.find((prod) => prod.id === row.productId);
                              if (p) setDeletingProduct(p);
                            }}
                            className="p-1 rounded text-standard hover:text-cf-wine hover:bg-red-50 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDICIÓN DE PRODUCTO */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs">
          <div className="bg-base-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-silver p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-silver/50">
              <h3 className="font-heading font-bold text-lg text-dark">
                Editar Producto: {editingProduct.title}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-standard hover:text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <Input
                label="Título del Producto"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />

              <div>
                <label className="block text-xs font-heading font-medium text-dark mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-body bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest"
                />
              </div>

              {/* Variantes del Producto */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold uppercase text-dark">
                    Variantes Asignadas
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditVariants((prev) => [
                        ...prev,
                        {
                          id: `var-${Date.now()}`,
                          product_id: editingProduct.id,
                          variant_name: "Nueva variante",
                          price: 0,
                          stock: 0,
                          low_stock_threshold: 3,
                        },
                      ]);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-cf-forest hover:text-cf-wine"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Variante</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editVariants.map((v, idx) => (
                    <div
                      key={v.id || idx}
                      className="grid grid-cols-12 gap-2 items-center p-2 rounded bg-zinc-50 border border-silver/40 text-xs"
                    >
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={v.variant_name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditVariants((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, variant_name: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 border border-silver rounded bg-white text-dark font-medium"
                          placeholder="Nombre variante"
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={v.price}
                          min="0"
                          step="100"
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setEditVariants((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, price: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 border border-silver rounded bg-white text-dark font-bold"
                          placeholder="Precio"
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={v.stock}
                          min="0"
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setEditVariants((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, stock: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 border border-silver rounded bg-white text-dark font-bold"
                          placeholder="Stock"
                          required
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          disabled={editVariants.length <= 1}
                          onClick={() => {
                            setEditVariants((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                          className="p-1 text-silver hover:text-cf-wine disabled:opacity-20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-silver/50">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs">
          <div className="bg-base-white rounded-xl shadow-2xl max-w-md w-full border border-silver p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-cf-wine mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-dark">
                ¿Eliminar {deletingProduct.title}?
              </h3>
              <p className="text-xs font-body text-standard">
                Esta acción eliminará el producto base y todas sus variantes físicas del catálogo. No se puede deshacer.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setDeletingProduct(null)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleConfirmDelete}
                className="bg-cf-wine hover:bg-[#8B1E3B]"
              >
                Sí, Eliminar Producto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
