'use client'

import { useMemo } from 'react'
import { useStartProjects } from './api/use-start-projects'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'
import type { ChartData } from '../chart-options/doughnut-data'

// Маппинг названий видов ремонта к цветам из конфига
const repairNameToColor: Record<string, string> = {
  КРН: '#1e40af',
  КРС: '#6b21a8',
  РС: '#c2410c',
  РП: '#166534',
}

// Порядок отображения видов ремонта
const repairOrder = ['КРН', 'КРС', 'РС', 'РП']

export function useFilteredDoughnutData() {
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

  // Получаем данные с сервера (уже отфильтрованные по году и дороге)
  // Всегда получаем все типы работ для отображения на графике
  const { data, isLoading } = useStartProjects(yearNumber, railwayId)

  // Преобразуем данные в формат для графика
  // Если выбрано "Все дороги", суммируем данные по всем дорогам для каждого типа работ
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    // Исключаем суммарные строки (repair_id === 0)
    const filtered = data.filter((item) => item.repair_id !== 0)

    // Группируем по repair_name и суммируем значения
    // Это работает как для одной дороги, так и для всех дорог (когда railwayId === null)
    const grouped = new Map<string, { project_cnt: number; distance: number }>()

    filtered.forEach((item) => {
      const existing = grouped.get(item.repair_name) || {
        project_cnt: 0,
        distance: 0,
      }
      grouped.set(item.repair_name, {
        project_cnt: existing.project_cnt + item.project_cnt,
        distance: existing.distance + item.distance,
      })
    })

    // Преобразуем в формат ChartData, сохраняя порядок
    const result: ChartData[] = repairOrder
      .filter((name) => grouped.has(name))
      .map((name) => {
        const values = grouped.get(name)!
        const color = repairNameToColor[name] || '#666666'
        return {
          name,
          value: values.project_cnt,
          fill: color,
          objects: values.project_cnt,
          kilometers: Math.round(values.distance * 1000) / 1000,
        }
      })

    return result
  }, [data])

  // Вычисляем суммарные значения для центра графика
  const centerData = useMemo(() => {
    if (typeOfWork && typeOfWork !== ALL_TYPES_OF_WORK) {
      // Если выбран конкретный вид работы, показываем данные только для него
      const selectedItem = chartData.find((item) => item.name === typeOfWork)
      return selectedItem
        ? { objects: selectedItem.objects, kilometers: selectedItem.kilometers }
        : { objects: 0, kilometers: 0 }
    } else {
      // Если выбрано "Все", показываем сумму всех типов
      const totalObjects = chartData.reduce(
        (sum, item) => sum + item.objects,
        0
      )
      const totalKilometers = chartData.reduce(
        (sum, item) => sum + item.kilometers,
        0
      )
      return { objects: totalObjects, kilometers: totalKilometers }
    }
  }, [chartData, typeOfWork])

  return {
    chartData,
    centerData,
    isLoading,
  }
}
