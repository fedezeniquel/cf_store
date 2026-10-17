import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // ID único para el ítem en el carrito (normalmente variantId)
  productId: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Acciones sobre ítems
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;

  // Controles de visibilidad del modal/drawer
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Getters computados
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const itemId = newItem.id || newItem.variantId;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.variantId === newItem.variantId
        );

        if (existingIndex > -1) {
          const existingItem = currentItems[existingIndex];
          const newQuantity = Math.min(
            existingItem.quantity + newItem.quantity,
            newItem.maxStock
          );

          const updatedItems = [...currentItems];
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };

          set({ items: updatedItems, isOpen: true });
        } else {
          const quantityToAdd = Math.min(newItem.quantity, newItem.maxStock);
          if (quantityToAdd <= 0) return;

          set({
            items: [
              ...currentItems,
              {
                ...newItem,
                id: itemId,
                quantity: quantityToAdd,
              },
            ],
            isOpen: true,
          });
        }
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map((item) => {
            if (item.variantId === variantId) {
              const safeQuantity = Math.min(quantity, item.maxStock);
              return { ...item, quantity: safeQuantity };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cf_yerba_cart_storage",
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos los ítems, no el estado del modal (isOpen)
      partialize: (state) => ({ items: state.items }),
    }
  )
);
