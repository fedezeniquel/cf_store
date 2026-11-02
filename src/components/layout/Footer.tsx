import Link from "next/link";
import { Truck, ShieldCheck, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-cf-forest text-white border-t border-cf-forest">
      {/* Banner de Valores / Beneficios */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <Truck className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-white text-base">Envíos a Todo el País</h4>
                <p className="text-silver text-xs font-body mt-1">
                  Coordinación personalizada y despacho ágil.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <ShieldCheck className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-white text-base">Calidad Agroecológica</h4>
                <p className="text-silver text-xs font-body mt-1">
                  Yerba natural estacionada y mates artesanales seleccionados.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <Heart className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-white text-base">Atención Directa</h4>
                <p className="text-silver text-xs font-body mt-1">
                  Cierre de pedidos mano a mano vía WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación y Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna Marca */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-story font-bold text-white tracking-wide">
              CF <span className="text-gold">YERBA</span>
            </h3>
            <p className="text-silver text-sm font-body max-w-sm">
              Cultivando el ritual del buen mate. Productos artesanales, yerba agroecológica y accesorios para compartir momentos únicos.
            </p>
          </div>

          {/* Enlaces de Exploración */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-gold">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm font-body text-silver">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Nuestra Historia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto / Administración */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-gold">
              Contacto
            </h4>
            <p className="text-silver text-sm font-body">
              Pedidos y consultas personalizadas mediante WhatsApp.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="text-xs text-silver/60 hover:text-silver underline transition-colors"
              >
                Acceso Vendedor
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-silver font-body">
          <p>© {new Date().getFullYear()} CF Yerba. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

