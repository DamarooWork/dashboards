import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ALL_ROADS, ALL_TYPES_OF_WORK, TYPES_OF_WORK_VALUES } from '../lib/const'

interface FiltersStore {
  year: string
  road: string
  typeOfWork: typeof TYPES_OF_WORK_VALUES[number]
  applyFilters: (year: string, road: string, typeOfWork: string) => void
  resetFilters: () => void
}

const currentYear = new Date().getFullYear().toString()

export const initialFiltersState = {
  year: currentYear,
  road: ALL_ROADS,
  typeOfWork: ALL_TYPES_OF_WORK,
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => ({
      ...initialFiltersState,
      applyFilters: (year, road, typeOfWork) => set({ year, road, typeOfWork }),
      resetFilters: () =>
        set({
          year: currentYear,
          road: ALL_ROADS,
          typeOfWork: ALL_TYPES_OF_WORK,
        }),
    }),
    {
      name: 'filters-storage',
      partialize: (state) => ({
        year: state.year,
        road: state.road,
        typeOfWork: state.typeOfWork,
      }),
    }
  )
)
