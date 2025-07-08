import { create } from 'zustand'

interface OrderState {
  orders: string[]
  addOrder: (order: string) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] }))
}))
