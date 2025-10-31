import { create } from 'zustand'

interface ChartSwitchStore {
  chartSwitchStatus: boolean
  toggleSwitch: () => void
  setSwitchStatus: (status: boolean) => void
}

export const useChartSwitchStore = create<ChartSwitchStore>((set) => ({
  chartSwitchStatus: false,
  toggleSwitch: () =>
    set((state) => ({ chartSwitchStatus: !state.chartSwitchStatus })),
  setSwitchStatus: (status) => set({ chartSwitchStatus: status }),
}))
