import { MOCK_PRODUCTS } from "@/lib/mockData";
import { InventoryTable } from "@/components/admin/InventoryTable";

export default function InventarioPage() {
  const products = MOCK_PRODUCTS;

  return (
    <div className="space-y-6">
      <div className="space-y-1 pb-4 border-b border-silver/50">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
          Control de Existencias
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-dark">
          Edición Masiva de Inventario
        </h1>
        <p className="text-standard font-body text-xs sm:text-sm">
          Ajustá precios de venta, stock disponible y umbrales de alerta por variante directamente en la tabla.
        </p>
      </div>

      <InventoryTable initialProducts={products} />
    </div>
  );
}
