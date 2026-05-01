import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity) => {
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.product.id === product.id && i.size === size && i.color === color
          );
          if (index > -1) {
            const items = [...state.items];
            items[index].quantity += quantity;
            return { items };
          }
          return { items: [...state.items, { product, size, color, quantity }] };
        });
      },
      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === id && i.size === size && i.color === color)
          ),
        }));
      },
      updateQuantity: (id, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + (item.product.discount_price ?? item.product.price) * item.quantity, 0),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'obelisk-cart',
    }
  )
);
