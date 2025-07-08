import { create } from 'zustand'

interface TabState {
  tab: string
  setTab: (tab: string) => void
}

export const useTabStore = create<TabState>((set) => ({
  tab: 'base',
  setTab: (tab) => set({ tab })
}))
