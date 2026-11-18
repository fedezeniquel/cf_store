"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Boxes, PlusCircle, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Redirige al login tras cerrar sesión
    router.push("/login");
  };

  const navLinks = [
    {
      name: "Dashboard & Alertas",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Inventario Masivo",
      href: "/admin/inventario",
      icon: Boxes,
      active: pathname === "/admin/inventario",
    },
    {
      name: "Nuevo Producto",
      href: "/admin/productos/nuevo",
      icon: PlusCircle,
      active: pathname === "/admin/productos/nuevo",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-body text-dark">
      {/* Top Navbar del Panel */}
      <header className="bg-cf-forest text-white border-b border-cf-forest/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-story font-bold text-xl text-white">
                CF <span className="text-gold">ADMIN</span>
              </span>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-heading font-medium transition-colors ${
                      link.active
                        ? "bg-white/15 text-white font-bold"
                        : "text-silver hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-heading text-silver hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Tienda</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-cf-wine hover:text-white text-silver text-xs font-heading font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Barra de Navegación Mobile */}
        <div className="md:hidden flex border-t border-white/10 overflow-x-auto px-4 py-2 gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-heading shrink-0 ${
                  link.active
                    ? "bg-white/20 text-white font-bold"
                    : "text-silver hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Contenido Principal del Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
