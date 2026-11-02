import { Metadata } from "next";
import { ProductCatalogClient } from "@/components/shop/ProductCatalogClient";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Catálogo de Productos | CF Yerba",
  description:
    "Explorá nuestro catálogo completo de mates artesanales, yerba agroecológica, bombillas de alpaca y combos exclusivos.",
};

export default async function ProductosPage() {
  let products = MOCK_PRODUCTS;
  let categories = MOCK_CATEGORIES;

  try {
    const supabase = await createClient();
    const { data: dbProducts } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*)")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const { data: dbCategories } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
    }
    if (dbCategories && dbCategories.length > 0) {
      categories = [{ id: "cat-todos", name: "Todos", slug: "todos" }, ...dbCategories];
    }
  } catch {
    // Si Supabase aún no está conectado en local, usamos MOCK_PRODUCTS
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Encabezado del Catálogo */}
      <div className="space-y-2">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
          Vidriera Digital
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-dark">
          Catálogo Completo
        </h1>
        <p className="text-standard font-body text-sm sm:text-base max-w-2xl">
          Seleccioná tus piezas artesanales y tu yerba agroecológica favorita. Las cantidades y variantes se coordinan directamente con el vendedor.
        </p>
      </div>

      {/* Catálogo Interactivo con Filtros */}
      <ProductCatalogClient initialProducts={products} categories={categories} />
    </div>
  );
}

