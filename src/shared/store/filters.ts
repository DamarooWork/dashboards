import { create } from 'zustand'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '../lib/const'

interface FiltersStore {
  year: string
  road: string
  typeOfWork: string
  applyFilters: (year: string, road: string, typeOfWork: string) => void
  resetFilters: () => void
}

const currentYear = new Date().getFullYear().toString()

export const initialFiltersState = {
  year: currentYear,
  road: ALL_ROADS,
  typeOfWork: ALL_TYPES_OF_WORK,
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialFiltersState,
  applyFilters: (year, road, typeOfWork) => set({ year, road, typeOfWork }),
  resetFilters: () =>
    set({
      year: currentYear,
      road: ALL_ROADS,
      typeOfWork: ALL_TYPES_OF_WORK,
    }),
}))
