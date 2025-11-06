'use client'

import { useState, useEffect } from 'react'
import { useFiltersStore } from '@/shared/store'
import { ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import {
  doughnutChartData,
  type ChartData,
} from '../chart-options/doughnut-data'

export function useDoughnutChart() {
  const { applyFilters, year, road, typeOfWork } = useFiltersStore()
  const [selectedType, setSelectedType] = useState<string | null>(() => {
    // Инициализируем из store, если выбран конкретный тип работы
    return typeOfWork && typeOfWork !== ALL_TYPES_OF_WORK ? typeOfWork : null
  })

  // Синхронизируем с store при изменении typeOfWork извне
  useEffect(() => {
    if (typeOfWork === ALL_TYPES_OF_WORK) {
      setSelectedType(null)
    } else if (
      typeOfWork &&
      doughnutChartData.some((item) => item.name === typeOfWork)
    ) {
      setSelectedType(typeOfWork)
    }
  }, [typeOfWork])

  // Вычисляем значения для отображения в центре
  const getCenterData = (): { objects: number; kilometers: number } => {
    if (selectedType === null) {
      // Если ничего не выбрано, показываем сумму всех типов
      const totalObjects = doughnutChartData.reduce(
        (sum, item) => sum + item.objects,
        0
      )
      const totalKilometers = doughnutChartData.reduce(
        (sum, item) => sum + item.kilometers,
        0
      )
      return { objects: totalObjects, kilometers: totalKilometers }
    } else {
      // Показываем данные для выбранного типа
      const selectedItem = doughnutChartData.find(
        (item) => item.name === selectedType
      )
      return selectedItem
        ? { objects: selectedItem.objects, kilometers: selectedItem.kilometers }
        : { objects: 0, kilometers: 0 }
    }
  }

  const centerData = getCenterData()

  // Обработчик выбора типа работы
  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type)
    // Синхронизируем с store фильтров
    const typeOfWorkValue = type === null ? ALL_TYPES_OF_WORK : type
    applyFilters(year, road, typeOfWorkValue)
  }

  // Обработчик клика на график (выбор всех типов)
  const handleChartClick = () => {
    handleTypeSelect(null)
  }

  return {
    selectedType,
    centerData,
    handleTypeSelect,
    handleChartClick,
  }
}

