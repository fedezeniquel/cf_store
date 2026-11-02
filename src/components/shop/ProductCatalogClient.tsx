"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/types/database";
import { ProductCard } from "@/components/shop/ProductCard";
import { Search } from "lucide-react";

interface ProductCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export const ProductCatalogClient: React.FC<ProductCatalogClientProps> = ({
  initialProducts,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Filtro por categoría
      const matchesCategory =
        selectedCategory === "todos" ||
        product.category?.slug === selectedCategory;

      // Filtro por búsqueda
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        product.title.toLowerCase().includes(query) ||
        (product.description &&
          product.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-silver/50">
        {/* Pills de Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 text-xs font-heading font-bold rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cf-forest text-white shadow-sm"
                    : "bg-base-white text-dark border border-silver hover:border-cf-forest"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Buscador por texto */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-standard absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-body bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest focus:ring-1 focus:ring-cf-forest"
          />
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex justify-between items-center text-xs font-body text-standard">
        <span>
          Mostrando <strong>{filteredProducts.length}</strong> producto
          {filteredProducts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grilla de productos */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-zinc-50 rounded-lg border border-silver/50">
          <p className="font-heading font-medium text-dark text-base">
            No se encontraron productos con estos criterios.
          </p>
          <p className="text-standard text-xs font-body">
            Probá seleccionando otra categoría o cambiando el término de búsqueda.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("todos");
              setSearchQuery("");
            }}
            className="text-xs font-heading font-bold text-cf-wine hover:underline cursor-pointer pt-2"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

