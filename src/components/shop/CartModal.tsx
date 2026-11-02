"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CustomerOrderData, generateWhatsAppLink } from "@/lib/whatsapp";

export const CartModal = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  const [step, setStep] = useState<"items" | "checkout">("items");
  const [customer, setCustomer] = useState<CustomerOrderData>({
    fullName: "",
    location: "",
    deliveryMethod: "Retiro",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const total = getTotalPrice();

  const validateCheckout = (): boolean => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) {
      errors.fullName = "Por favor ingresa tu nombre completo";
    }
    if (!customer.location.trim()) {
      errors.location = "Indica tu localidad o ciudad";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOrder = () => {
    if (!validateCheckout()) return;

    const orderItems = items.map((item) => ({
      id: item.variantId,
      productId: item.productId,
      title: item.title,
      variantName: item.variantName,
      quantity: item.quantity,
      price: item.price,
    }));

    const url = generateWhatsAppLink(orderItems, customer, total);

    // Limpiamos el carrito tras generar la orden y abrimos WhatsApp
    clearCart();
    closeCart();
    setStep("items");
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-dark/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-base-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-cf-forest text-white flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-white">
              {step === "items" ? "Tu Carrito de Compras" : "Datos de Entrega"}
            </h2>
            <button
              onClick={closeCart}
              className="p-1 rounded-full text-white hover:text-gold transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <p className="text-standard font-body text-sm">
                  Tu carrito está vacío por el momento.
                </p>
                <Button variant="primary" onClick={closeCart}>
                  Explorar Catálogo
                </Button>
              </div>
            ) : step === "items" ? (
              /* Lista de items */
              <div className="divide-y divide-silver/50">
                {items.map((item) => (
                  <div key={item.variantId} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-md bg-zinc-100 overflow-hidden shrink-0 border border-silver">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-standard">
                          Sin foto
                        </div>
                      )}
                    </div>

                    {/* Detalle */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-dark line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-xs text-standard font-body">
                            Variante: {item.variantName}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-silver hover:text-cf-wine transition-colors p-1"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Selector de Cantidad */}
                        <div className="flex items-center border border-silver rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="p-1 hover:bg-zinc-100 text-dark"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-heading font-bold text-dark">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={item.quantity >= item.maxStock}
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="p-1 hover:bg-zinc-100 text-dark disabled:opacity-40"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-heading font-bold text-sm text-dark">
                          ${(item.price * item.quantity).toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Formulario de Checkout */
              <div className="space-y-4 pt-2">
                <Input
                  label="Nombre Completo *"
                  placeholder="Ej: Sofía Gómez"
                  value={customer.fullName}
                  error={formErrors.fullName}
                  onChange={(e) =>
                    setCustomer({ ...customer, fullName: e.target.value })
                  }
                />

                <Input
                  label="Localidad / Ciudad *"
                  placeholder="Ej: Posadas, Misiones"
                  error={formErrors.location}
                  value={customer.location}
                  onChange={(e) =>
                    setCustomer({ ...customer, location: e.target.value })
                  }
                />

                <div className="space-y-1">
                  <label className="block text-xs font-heading font-medium text-dark mb-1">
                    Método de entrega
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCustomer({ ...customer, deliveryMethod: "Retiro" })
                      }
                      className={`py-2 px-3 text-xs font-heading font-bold rounded-md border text-center transition-colors ${
                        customer.deliveryMethod === "Retiro"
                          ? "bg-cf-forest text-white border-cf-forest"
                          : "border-silver bg-base-white text-dark hover:border-cf-forest"
                      }`}
                    >
                      Retiro en Punto
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCustomer({ ...customer, deliveryMethod: "Envío" })
                      }
                      className={`py-2 px-3 text-xs font-heading font-bold rounded-md border text-center transition-colors ${
                        customer.deliveryMethod === "Envío"
                          ? "bg-cf-forest text-white border-cf-forest"
                          : "border-silver bg-base-white text-dark hover:border-cf-forest"
                      }`}
                    >
                      Envío a Domicilio
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-heading font-medium text-dark mb-1">
                    Aclaraciones o Notas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Horario de entrega preferido..."
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({ ...customer, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest focus:ring-1 focus:ring-cf-forest"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer del Carrito */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-silver/50 bg-zinc-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-heading font-medium text-standard text-sm">
                  Total Estimado
                </span>
                <span className="font-heading font-bold text-2xl text-dark">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>

              {step === "items" ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => setStep("checkout")}
                >
                  <span>Continuar con el Pedido</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep("items")}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-2 gap-2"
                    onClick={handleSendOrder}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pedir por WhatsApp</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

