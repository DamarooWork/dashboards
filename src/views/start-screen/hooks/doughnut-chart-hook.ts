'use client'

import { startTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFiltersStore } from '@/shared/store'
import { ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import { useFilteredDoughnutData } from './use-filtered-doughnut-data'

export function useDoughnutChart() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const applyFilters = useFiltersStore((state) => state.applyFilters)
  const { year, road, typeOfWork } = useFiltersStore()
  const { chartData, centerData, isLoading } = useFilteredDoughnutData()

  // Обработчик выбора типа работы
  const handleTypeSelect = (type: string | null) => {
    // Получаем актуальные значения из store напрямую
    const currentState = useFiltersStore.getState()
    const newTypeOfWork = type || ALL_TYPES_OF_WORK

    // Обновляем store синхронно (это быстро)
    applyFilters(currentState.year, currentState.road, newTypeOfWork)

    // Обновляем URL асинхронно через startTransition (не блокирует UI)
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('year', currentState.year)
      params.set('road', currentState.road)
      params.set('typeOfWork', newTypeOfWork)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  // Обработчик клика на график (выбор всех типов)
  const handleChartClick = () => {
    handleTypeSelect(null)
  }

  return {
    typeOfWork,
    centerData,
    handleTypeSelect,
    handleChartClick,
    chartData: chartData || [],
    isLoading,
  }
}
