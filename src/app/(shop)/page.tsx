import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/database";
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass } from "lucide-react";

// Productos de muestra para el Home mientras se cargan datos reales desde Supabase
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Mate Torpedo Artesanal Uruguayo",
    slug: "mate-torpedo-artesanal",
    description:
      "Calabaza gruesa seleccionada, forrado en cuero vacuno legítimo con costura reforzada.",
    category_id: "cat-mates",
    image_url: null,
    is_published: true,
    created_at: new Date().toISOString(),
    category: { id: "cat-mates", name: "Mates", slug: "mates" },
    variants: [
      {
        id: "var-1",
        product_id: "prod-1",
        variant_name: "Sin virola",
        price: 24500,
        stock: 5,
        low_stock_threshold: 3,
      },
      {
        id: "var-2",
        product_id: "prod-1",
        variant_name: "Virola lisa",
        price: 28900,
        stock: 4,
        low_stock_threshold: 3,
      },
      {
        id: "var-3",
        product_id: "prod-1",
        variant_name: "Virola cincelada",
        price: 33500,
        stock: 2,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-2",
    title: "Yerba Mate Agroecológica 1kg",
    slug: "yerba-mate-agroecologica-1kg",
    description:
      "Cosecha manual y secado barbacuá tradicional con 24 meses de estacionamiento natural.",
    category_id: "cat-yerba",
    image_url: null,
    is_published: true,
    created_at: new Date().toISOString(),
    category: { id: "cat-yerba", name: "Yerba Mate", slug: "yerba" },
    variants: [
      {
        id: "var-4",
        product_id: "prod-2",
        variant_name: "Paquete 1kg",
        price: 7200,
        stock: 15,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-3",
    title: "Bombilla Pico de Loro de Alpaca",
    slug: "bombilla-pico-loro-alpaca",
    description:
      "Filtro ranurado desmontable de fácil limpieza, caño cincelado con soldadura de plata.",
    category_id: "cat-bombillas",
    image_url: null,
    is_published: true,
    created_at: new Date().toISOString(),
    category: { id: "cat-bombillas", name: "Bombillas", slug: "bombillas" },
    variants: [
      {
        id: "var-5",
        product_id: "prod-3",
        variant_name: "Estándar 19cm",
        price: 14800,
        stock: 8,
        low_stock_threshold: 3,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION (Fondo cf-forest con acentos dorados y texto blanco) */}
      <section className="relative bg-cf-forest text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BFA004_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-heading font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cosecha Seleccionada & Elaboración Artesanal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-story font-bold tracking-tight text-white leading-tight">
              El ritual del buen mate comienza en la tierra.
            </h1>

            <p className="text-silver font-body text-base sm:text-lg leading-relaxed">
              Descubrí nuestra yerba mate agroecológica de estacionamiento natural y piezas artesanales forjadas para acompañarte toda la vida.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/productos">
                <Button variant="primary" size="lg" className="gap-2">
                  <span>Ver Catálogo</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/nosotros">
                <Button variant="secondary" size="lg">
                  Nuestra Historia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
              Selección Exclusiva
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-dark mt-1">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-sm font-heading font-bold text-cf-forest hover:text-cf-wine transition-colors inline-flex items-center gap-1"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* STORYTELLING SECTION (Patrón en Z, fondo cf-forest, tipografía Montserrat) */}
      <section className="bg-cf-forest text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Bloque Z 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-gold text-xs font-heading font-bold uppercase tracking-wider">
                El Proceso
              </span>
              <h3 className="text-3xl font-story font-bold text-white">
                Secado Barbacuá y Estacionamiento Natural
              </h3>
              <p className="text-silver font-body text-sm sm:text-base leading-relaxed">
                Nuestra yerba mate proviene de pequeños productores misioneros que respetan el monte nativo. Sin aceleradores artificiales: cada hoja pasa por un estacionamiento natural prolongado de hasta 24 meses que garantiza un sabor suave, redondo y sin acidez.
              </p>
              <div className="pt-2 flex items-center gap-3 text-gold">
                <Flame className="w-5 h-5" />
                <span className="font-heading text-xs font-bold uppercase tracking-wide">
                  Sabor inigualable desde el primer cebado
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-4">
              <ShieldCheck className="w-16 h-16 text-gold" />
              <h4 className="font-story font-bold text-xl text-white">100% Agroecológica</h4>
              <p className="text-silver text-xs font-body max-w-sm">
                Libre de agroquímicos y pesticidas. Un producto noble para tu salud y para el ecosistema.
              </p>
            </div>
          </div>

          {/* Bloque Z 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl bg-white/5 border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-4">
              <Compass className="w-16 h-16 text-gold" />
              <h4 className="font-story font-bold text-xl text-white">Piezas Únicas</h4>
              <p className="text-silver text-xs font-body max-w-sm">
                Cada mate cuenta con su propia identidad, confeccionado a mano con cueros seleccionados y virolas trabajadas al detalle.
              </p>
            </div>

            <div className="order-1 lg:order-2 space-y-4">
              <span className="text-gold text-xs font-heading font-bold uppercase tracking-wider">
                Artesanía Criolla
              </span>
              <h3 className="text-3xl font-story font-bold text-white">
                Mates que Trascienden Generaciones
              </h3>
              <p className="text-silver font-body text-sm sm:text-base leading-relaxed">
                Seleccionamos calabazas de paredes gruesas que aseguran la temperatura ideal y la durabilidad necesaria para el uso diario. Combinadas con virolas de alpaca cincelada y cuero cosido a mano por maestros artesanos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

