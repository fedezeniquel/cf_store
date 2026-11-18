import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { LowStockAlert, LowStockItem } from "@/components/admin/LowStockAlert";
import { Button } from "@/components/ui/Button";
import { Package, Boxes, AlertTriangle, PlusCircle, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const products = MOCK_PRODUCTS;

  // Calculamos alertas de bajo stock
  const lowStockItems: LowStockItem[] = [];
  let totalVariants = 0;
  let totalUnits = 0;
  let totalInventoryValue = 0;

  products.forEach((product) => {
    (product.variants || []).forEach((variant) => {
      totalVariants += 1;
      totalUnits += variant.stock;
      totalInventoryValue += variant.price * variant.stock;

      if (variant.stock <= variant.low_stock_threshold) {
        lowStockItems.push({
          productTitle: product.title,
          variant,
        });
      }
    });
  });

  return (
    <div className="space-y-8">
      {/* Encabezado del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-silver/50">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
            Panel de Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-dark mt-1">
            Resumen General de Catálogo
          </h1>
          <p className="text-standard font-body text-xs sm:text-sm mt-0.5">
            Supervisión rápida de existencias, variantes activas y alertas de reposición.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/productos/nuevo">
            <Button variant="primary" size="md" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-white p-5 rounded-lg border border-silver/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-standard">
            <span className="text-xs font-heading font-medium">Productos Base</span>
            <Package className="w-4 h-4 text-cf-forest" />
          </div>
          <div className="text-2xl font-heading font-bold text-dark">
            {products.length}
          </div>
          <span className="text-[11px] text-standard font-body block">
            Publicados en vidriera
          </span>
        </div>

        <div className="bg-base-white p-5 rounded-lg border border-silver/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-standard">
            <span className="text-xs font-heading font-medium">Variantes Totales</span>
            <Boxes className="w-4 h-4 text-action-slate" />
          </div>
          <div className="text-2xl font-heading font-bold text-dark">
            {totalVariants}
          </div>
          <span className="text-[11px] text-standard font-body block">
            Virolas y presentaciones
          </span>
        </div>

        <div className="bg-base-white p-5 rounded-lg border border-silver/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-standard">
            <span className="text-xs font-heading font-medium">Unidades en Stock</span>
            <Boxes className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-heading font-bold text-dark">
            {totalUnits} un.
          </div>
          <span className="text-[11px] text-standard font-body block">
            Disponibilidad inmediata
          </span>
        </div>

        <div className="bg-base-white p-5 rounded-lg border border-silver/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-standard">
            <span className="text-xs font-heading font-medium">Alertas de Reposición</span>
            <AlertTriangle className="w-4 h-4 text-cf-wine" />
          </div>
          <div className="text-2xl font-heading font-bold text-cf-wine">
            {lowStockItems.length}
          </div>
          <span className="text-[11px] text-standard font-body block">
            Variantes bajo umbral
          </span>
        </div>
      </div>

      {/* Alerta de Stock Bajo */}
      <LowStockAlert items={lowStockItems} />

      {/* Acciones Rápidas */}
      <div className="bg-base-white border border-silver/60 rounded-lg p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-dark">
          Gestión Frecuente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/inventario"
            className="p-4 rounded-lg border border-silver/60 hover:border-cf-forest hover:bg-zinc-50 transition-colors flex items-center justify-between group"
          >
            <div>
              <h4 className="font-heading font-bold text-sm text-dark group-hover:text-cf-forest">
                Actualizar Precios y Stock
              </h4>
              <p className="text-xs font-body text-standard mt-0.5">
                Modificación masiva en grilla de todas las variantes de una sola vez.
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-standard group-hover:text-cf-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/admin/productos/nuevo"
            className="p-4 rounded-lg border border-silver/60 hover:border-cf-forest hover:bg-zinc-50 transition-colors flex items-center justify-between group"
          >
            <div>
              <h4 className="font-heading font-bold text-sm text-dark group-hover:text-cf-forest">
                Cargar un Producto Nuevo
              </h4>
              <p className="text-xs font-body text-standard mt-0.5">
                Crear ficha base con fotos, virolas y stock inicial.
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-standard group-hover:text-cf-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
