import { create } from 'zustand'

interface FiltersStore {
  year: string
  road: string
  typeOfWork: string
  applyFilters: (year: string, road: string, typeOfWork: string) => void
  resetFilters: () => void
}

const currentYear = new Date().getFullYear().toString()

export const useFiltersStore = create<FiltersStore>((set) => ({
  year: currentYear,
  road: 'Все дороги',
  typeOfWork: 'Все',
  applyFilters: (year, road, typeOfWork) => set({ year, road, typeOfWork }),
  resetFilters: () =>
    set({
      year: currentYear,
      road: 'Все дороги',
      typeOfWork: 'Все',
    }),
}))
