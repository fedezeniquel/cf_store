import React from "react";
import { OrderSummary } from "@/types/database";
import { TrendingUp, ShoppingBag, Clock, CheckCircle2 } from "lucide-react";

interface SalesSummaryProps {
  orders: OrderSummary[];
}

export const SalesSummary: React.FC<SalesSummaryProps> = ({ orders }) => {
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const completedOrders = orders.filter((o) => o.status === "Completado").length;
  const inProgressOrders = orders.filter((o) => o.status !== "Completado").length;

  return (
    <div className="bg-base-white border border-silver/60 rounded-xl p-6 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-silver/40">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-cf-forest">
            Ventas & Pedidos
          </span>
          <h3 className="font-heading font-bold text-lg text-dark mt-0.5">
            Resumen de Actividad Reciente
          </h3>
        </div>

        {/* Cifra Total Recaudada */}
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-heading uppercase text-emerald-800 font-bold block">
              Volumen Estimado
            </span>
            <span className="text-lg font-heading font-bold text-emerald-950">
              ${totalRevenue.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      {/* Mini Métricas de Pedidos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-zinc-50 border border-silver/50 flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-cf-forest" />
          <div>
            <span className="text-xs text-standard block">Total Pedidos</span>
            <span className="font-heading font-bold text-dark text-base">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50 border border-silver/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="text-xs text-standard block">Completados</span>
            <span className="font-heading font-bold text-dark text-base">
              {completedOrders}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50 border border-silver/50 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600" />
          <div>
            <span className="text-xs text-standard block">En Coordinación</span>
            <span className="font-heading font-bold text-dark text-base">
              {inProgressOrders}
            </span>
          </div>
        </div>
      </div>

      {/* Listado de Últimos Pedidos WhatsApp */}
      <div className="space-y-3">
        <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-standard">
          Últimas Consultas y Pedidos
        </h4>

        <div className="divide-y divide-silver/40 rounded-lg border border-silver/50 overflow-hidden bg-base-white text-xs">
          {orders.map((order) => {
            const statusStyles = {
              Completado: "bg-emerald-50 text-emerald-800 border-emerald-200",
              Coordinando: "bg-amber-50 text-amber-800 border-amber-200",
              Pendiente: "bg-zinc-100 text-zinc-700 border-silver",
            }[order.status];

            return (
              <div
                key={order.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-dark text-sm">
                      {order.customerName}
                    </span>
                    <span className="text-standard text-[11px]">· {order.date}</span>
                  </div>

                  <p className="text-standard text-xs">
                    {order.location} · <em>{order.deliveryMethod}</em>
                  </p>

                  <div className="text-[11px] text-dark/80 pt-0.5">
                    {order.items
                      .map(
                        (i) =>
                          `${i.quantity}x ${i.productTitle} (${i.variantName})`
                      )
                      .join(", ")}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <span className="font-heading font-bold text-sm text-dark">
                    ${order.total.toLocaleString("es-AR")}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold border ${statusStyles}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
