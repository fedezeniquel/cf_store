"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Plus, Trash2, Upload, CheckCircle2 } from "lucide-react";

interface VariantFormInput {
  name: string;
  price: number;
  stock: number;
  threshold: number;
}

export default function NuevoProductoPage() {
  const router = useRouter();
  const categories = MOCK_CATEGORIES.filter((c) => c.slug !== "todos");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [variants, setVariants] = useState<VariantFormInput[]>([
    { name: "Sin virola", price: 25000, stock: 5, threshold: 3 },
    { name: "Virola lisa", price: 29000, stock: 3, threshold: 3 },
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      { name: "Nueva variante", price: 0, stock: 0, threshold: 3 },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof VariantFormInput,
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Mock de guardado (en fase de backend se inserta en Supabase + Storage)
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/inventario");
      }, 1200);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-standard hover:text-dark"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Volver al Dashboard</span>
      </Link>

      <div className="space-y-1 pb-4 border-b border-silver/50">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
          Alta de Catálogo
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-dark">
          Nuevo Producto
        </h1>
        <p className="text-standard font-body text-xs sm:text-sm">
          Carga un nuevo producto base y define sus variantes con precio y stock individual.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs font-heading font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>¡Producto creado con éxito! Redirigiendo al inventario...</span>
          </div>
        )}

        {/* Sección 1: Datos Base del Producto */}
        <div className="bg-base-white border border-silver/60 rounded-xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-base text-dark">
            Información General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título del Producto *"
              placeholder="Ej: Mate Torpedo Uruguayo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-heading font-medium text-dark mb-1">
                Categoría *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-body bg-base-white border border-silver rounded-md text-dark focus:outline-none focus:border-cf-forest"
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-medium text-dark mb-1">
              Descripción Completa
            </label>
            <textarea
              rows={3}
              placeholder="Detalla materiales (cuero vacuno, calabaza gruesa), dimensiones y cuidados..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs font-body bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest"
            />
          </div>

          {/* Subida de Imagen */}
          <div>
            <label className="block text-xs font-heading font-medium text-dark mb-1">
              Fotografía del Producto (Storage Supabase)
            </label>
            <div className="border-2 border-dashed border-silver rounded-lg p-6 text-center hover:border-cf-forest transition-colors cursor-pointer bg-zinc-50">
              <Upload className="w-8 h-8 mx-auto text-standard mb-2" />
              <p className="text-xs font-heading font-bold text-dark">
                Arrastrá una imagen o hacé clic para seleccionar
              </p>
              <p className="text-[11px] text-standard font-body mt-1">
                Formatos recomendados: JPG, PNG o WebP (máx. 2MB).
              </p>
            </div>
          </div>
        </div>

        {/* Sección 2: Variantes e Inventario */}
        <div className="bg-base-white border border-silver/60 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-base text-dark">
                Variantes y Stock
              </h2>
              <p className="text-xs font-body text-standard">
                Para mates: &apos;Sin virola&apos;, &apos;Virola lisa&apos;, etc. Para yerba: &apos;1kg&apos;, &apos;500g&apos;.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddVariant}
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Variante</span>
            </Button>
          </div>

          <div className="space-y-3">
            {variants.map((v, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-lg border border-silver/50 bg-zinc-50"
              >
                <div className="sm:col-span-4">
                  <Input
                    label={index === 0 ? "Nombre de Variante" : undefined}
                    placeholder="Ej: Virola lisa"
                    value={v.name}
                    onChange={(e) =>
                      handleVariantChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    label={index === 0 ? "Precio ($)" : undefined}
                    type="number"
                    min="0"
                    step="100"
                    value={v.price}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "price",
                        parseInt(e.target.value) || 0
                      )
                    }
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label={index === 0 ? "Stock" : undefined}
                    type="number"
                    min="0"
                    value={v.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "stock",
                        parseInt(e.target.value) || 0
                      )
                    }
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label={index === 0 ? "Umbral" : undefined}
                    type="number"
                    min="0"
                    value={v.threshold}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "threshold",
                        parseInt(e.target.value) || 0
                      )
                    }
                    required
                  />
                </div>

                <div className="sm:col-span-1 flex justify-center pt-1 sm:pt-4">
                  <button
                    type="button"
                    disabled={variants.length <= 1}
                    onClick={() => handleRemoveVariant(index)}
                    className="p-1.5 text-silver hover:text-cf-wine disabled:opacity-20 cursor-pointer"
                    aria-label="Eliminar variante"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/admin">
            <Button type="button" variant="outline" size="md">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={saving || success}
          >
            {saving ? "Guardando Producto..." : "Guardar y Publicar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
