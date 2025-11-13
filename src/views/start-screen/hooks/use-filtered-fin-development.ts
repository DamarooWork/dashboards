'use client'

import { useMemo } from 'react'
import { useStartFinDevelopment } from './api/use-start-fin-development'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'

export function useFilteredFinDevelopment() {
  const { year, road, typeOfWork } = useFiltersStore()

  // Получаем ID дороги из названия
  const railwayId = useMemo(() => {
    if (!road || road === ALL_ROADS) {
      return null
    }
    const roadItem = roads.find((r) => r.name === road)
    return roadItem?.id ?? null
  }, [road])

  // Преобразуем год в число
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  // Определяем repairName для запроса
  const repairName = useMemo(() => {
    if (!typeOfWork || typeOfWork === ALL_TYPES_OF_WORK) {
      return ALL_TYPES_OF_WORK
    }
    return typeOfWork
  }, [typeOfWork])

  // Получаем данные с сервера (уже отфильтрованные по году, дороге (если она передана) и типу работ)
  const { data, isLoading } = useStartFinDevelopment(
    yearNumber,
    railwayId,
    repairName
  )

  // Обрабатываем данные: если не выбрана дорога, суммируем данные по всем дорогам
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return null

    // Если одна запись, возвращаем её
    if (data.length === 1) {
      return data[0]
    }

    // Если несколько записей (не выбрана дорога), суммируем все значения
    const firstItem = data[0]
    const aggregated = data.reduce(
      (acc, item) => {
        return {
          general_plan: acc.general_plan + item.general_plan,
          general_fact: acc.general_fact + item.general_fact,
          economic_plan: acc.economic_plan + item.economic_plan,
          economic_fact: acc.economic_fact + item.economic_fact,
          other_plan: acc.other_plan + item.other_plan,
          other_fact: acc.other_fact + item.other_fact,
          pir_plan: acc.pir_plan + item.pir_plan,
          pir_fact: acc.pir_fact + item.pir_fact,
        }
      },
      {
        general_plan: 0,
        general_fact: 0,
        economic_plan: 0,
        economic_fact: 0,
        other_plan: 0,
        other_fact: 0,
        pir_plan: 0,
        pir_fact: 0,
      }
    )

    // Пересчитываем дельты и проценты на основе суммированных значений
    const generalDelta = aggregated.general_fact - aggregated.general_plan
    const generalPerc =
      aggregated.general_plan > 0
        ? (aggregated.general_fact / aggregated.general_plan) * 100
        : 0

    const economicDelta = aggregated.economic_fact - aggregated.economic_plan
    const economicPerc =
      aggregated.economic_plan > 0
        ? (aggregated.economic_fact / aggregated.economic_plan) * 100
        : 0

    const otherDelta = aggregated.other_fact - aggregated.other_plan
    const otherPerc =
      aggregated.other_plan > 0
        ? (aggregated.other_fact / aggregated.other_plan) * 100
        : 0

    const pirDelta = aggregated.pir_fact - aggregated.pir_plan
    const pirPerc =
      aggregated.pir_plan > 0
        ? (aggregated.pir_fact / aggregated.pir_plan) * 100
        : 0

    return {
      ...firstItem,
      railway_id: 0, // Для агрегированных данных
      railway_name: ALL_ROADS,
      ...aggregated,
      general_delta: generalDelta,
      general_perc: generalPerc,
      economic_delta: economicDelta,
      economic_perc: economicPerc,
      other_delta: otherDelta,
      other_perc: otherPerc,
      pir_delta: pirDelta,
      pir_perc: pirPerc,
    }
  }, [data])

  return {
    data: filteredData,
    isLoading,
  }
}
