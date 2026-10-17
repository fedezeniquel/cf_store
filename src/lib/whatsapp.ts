export interface OrderItem {
  id: string; // ID de la variante
  productId: string;
  title: string;
  variantName: string;
  quantity: number;
  price: number;
}

export interface CustomerOrderData {
  fullName: string;
  location: string;
  deliveryMethod: "Retiro" | "Envío";
  notes?: string;
}

const DEFAULT_PHONE = "5491100000000";

/**
 * Formatea el mensaje del pedido con emojis y estructura limpia para WhatsApp
 */
export function formatOrderMessage(
  items: OrderItem[],
  customer: CustomerOrderData,
  total: number
): string {
  const itemsText = items
    .map(
      (item) =>
        `• *${item.title}* (${item.variantName})\n  ${item.quantity} un. x $${item.price.toLocaleString("es-AR")} = *$${(item.price * item.quantity).toLocaleString("es-AR")}*`
    )
    .join("\n\n");

  const formattedTotal = total.toLocaleString("es-AR");

  let message = `🌿 *¡Nuevo Pedido - CF Yerba!* 🌿\n\n`;
  message += `👤 *Cliente:* ${customer.fullName.trim()}\n`;
  message += `📍 *Localidad / Ciudad:* ${customer.location.trim()}\n`;
  message += `🚚 *Método de entrega:* ${customer.deliveryMethod}\n`;

  if (customer.notes && customer.notes.trim().length > 0) {
    message += `📝 *Aclaraciones:* ${customer.notes.trim()}\n`;
  }

  message += `\n📦 *Detalle del Pedido:*\n${itemsText}\n\n`;
  message += `💰 *Total Estimado:* *$${formattedTotal}*\n\n`;
  message += `💬 _Hola! Quiero coordinar el pago (transferencia/efectivo) y la entrega de este pedido._`;

  return message;
}

/**
 * Genera la URL codificada hacia la API wa.me con el mensaje estructurado
 */
export function generateWhatsAppLink(
  items: OrderItem[],
  customer: CustomerOrderData,
  total: number,
  phoneOverride?: string
): string {
  const rawPhone =
    phoneOverride ||
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
    DEFAULT_PHONE;

  // Sanitizar el número telefónico para que contenga solo dígitos
  const cleanPhone = rawPhone.replace(/\D/g, "");
  const message = formatOrderMessage(items, customer, total);

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
