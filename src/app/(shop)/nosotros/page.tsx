import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sprout, SunMedium, Flame, Clock, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nuestra Historia & Proceso Agroecológico | CF Yerba",
  description:
    "Conocé el origen de CF Yerba: respeto por la tierra, secado barbacuá tradicional y estacionamiento natural de hasta 24 meses.",
};

export default function NosotrosPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Encabezado Editorial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
          Manifiesto de Marca
        </span>
        <h1 className="text-4xl sm:text-5xl font-story font-bold text-dark leading-tight">
          Volver al origen: paciencia, monte nativo y tradición viva.
        </h1>
        <p className="text-standard font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          En CF Yerba entendemos el mate como un punto de encuentro, una pausa necesaria y una conexión profunda con nuestras raíces.
        </p>
      </section>

      {/* Pilares del Proceso Agroecológico */}
      <section className="bg-cf-forest text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-gold text-xs font-heading font-bold uppercase tracking-wider">
              El Secreto de la Calidad
            </span>
            <h2 className="text-3xl font-story font-bold text-white">
              Un proceso que respeta los tiempos de la naturaleza
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <Sprout className="w-10 h-10 text-gold" />
              <h3 className="text-xl font-story font-bold text-white">
                Suelo & Biodiversidad
              </h3>
              <p className="text-silver text-sm font-body leading-relaxed">
                Nuestras plantaciones conviven en armonía con la flora y fauna de la selva paranaense misionera, sin herbicidas ni fertilizantes sintéticos.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <Flame className="w-10 h-10 text-gold" />
              <h3 className="text-xl font-story font-bold text-white">
                Secado Barbacuá Ancestral
              </h3>
              <p className="text-silver text-sm font-body leading-relaxed">
                Utilizamos el método tradicional donde las hojas se deshidratan lentamente con calor de leñas seleccionadas, adquiriendo notas aromáticas inigualables.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <Clock className="w-10 h-10 text-gold" />
              <h3 className="text-xl font-story font-bold text-white">
                Estacionamiento 24 Meses
              </h3>
              <p className="text-silver text-sm font-body leading-relaxed">
                El tiempo es nuestro mejor aliado. Dejamos madurar la yerba en depósitos acondicionados hasta lograr un sabor suave que nunca produce acidez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La Confección de los Mates y Accesorios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-wine">
              Manos Artesanas
            </span>
            <h2 className="text-3xl sm:text-4xl font-story font-bold text-dark">
              Cada pieza cuenta una historia irrepetible
            </h2>
            <p className="text-standard font-body text-sm sm:text-base leading-relaxed">
              Trabajamos junto a maestros orfebres y artesanos del cuero. Cada calabaza es seleccionada por su grosor y porosidad ideal, forrada en cuero vacuno teñido naturalmente y coronada con virolas forjadas a golpe de cincel.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <SunMedium className="w-5 h-5 text-cf-forest shrink-0 mt-0.5" />
                <p className="text-xs font-body text-dark">
                  <strong>Curado noble:</strong> La madera y la calabaza vegetal absorben los aceites esenciales de la yerba con cada cebada.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-cf-forest shrink-0 mt-0.5" />
                <p className="text-xs font-body text-dark">
                  <strong>Metales nobles:</strong> Alpaca maciza pulida a mano que no transfiere sabores extraños ni se degrada con el agua caliente.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-cf-forest shrink-0 mt-0.5" />
                <p className="text-xs font-body text-dark">
                  <strong>Comercio justo:</strong> Relación directa y transparente con artesanos y cosechadores locales.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 border border-silver rounded-2xl p-8 sm:p-12 text-center space-y-6">
            <h3 className="text-2xl font-story font-bold text-dark">
              ¿Listo para empezar tu ritual?
            </h3>
            <p className="text-standard font-body text-sm max-w-md mx-auto">
              Te invitamos a descubrir nuestra selección de productos y elegir el compañero ideal para tus cebadas de todos los días.
            </p>
            <Link href="/productos" className="inline-block">
              <Button variant="primary" size="lg">
                Explorar el Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

