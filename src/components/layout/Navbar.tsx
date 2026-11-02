"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-cf-forest shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Marca */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-story font-bold text-white tracking-wide">
              CF <span className="text-gold">YERBA</span>
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-gold transition-colors font-heading text-sm font-medium tracking-wide"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-white hover:text-gold transition-colors font-heading text-sm font-medium tracking-wide"
            >
              Catálogo
            </Link>
            <Link
              href="/nosotros"
              className="text-white hover:text-gold transition-colors font-heading text-sm font-medium tracking-wide"
            >
              Nuestra Historia
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              aria-label="Abrir Carrito"
              className="relative p-2 text-white hover:text-gold transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cf-wine text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón Menú Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-gold transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cf-forest border-t border-cf-forest/50 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold py-2 font-heading font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold py-2 font-heading font-medium"
          >
            Catálogo
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-gold py-2 font-heading font-medium"
          >
            Nuestra Historia
          </Link>
        </div>
      )}
    </header>
  );
};

