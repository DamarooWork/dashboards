'use client'

import { useMemo } from 'react'
import { useDesignSpecStatus } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'
import { DesignSpecStatusItem } from '../lib/types'

export function useCardsData() {
  const { road, year } = useFiltersStore()

  // Получаем ID дороги из названия
  // Если дорога не выбрана или "Все дороги", передаем null для агрегированных данных
  const railwayId = useMemo(() => {
    if (!road || road === ALL_ROADS) {
      return null
    }
    const roadItem = roads.find((r) => r.name === road)
    return roadItem?.id ?? null
  }, [road])

  // Преобразуем год в число
  // Если год не выбран, передаем null для агрегированных данных
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  const { data: reportData, isLoading } = useDesignSpecStatus()

  // Обработка данных design_spec_status
  const cardsData = useMemo(() => {
    if (
      !reportData?.contents ||
      !Array.isArray(reportData.contents) ||
      reportData.contents.length === 0
    ) {
      return {
        approvedCount: 0,
        totalCount: 0,
        transferredCount: 0,
        approvalDate: null,
        transferDate: null,
      }
    }

    // API возвращает массив записей
    const items: DesignSpecStatusItem[] = reportData.contents

    // Подсчитываем утвержденные (dsp_task_workflowstepname === 'completed')
    const approvedCount = items.filter(
      (item) => item.dsp_task_workflowstepname === 'completed'
    ).length

    // Подсчитываем переданные (cl_task_workflowstepname === 'completed')
    const transferredCount = items.filter(
      (item) => item.cl_task_workflowstepname === 'completed'
    ).length

    // Общее количество записей
    const totalCount = items.length

    // Находим последнюю дату завершения утверждения среди completed
    const approvalDates = items
      .filter((item) => item.dsp_task_workflowstepname === 'completed')
      .map((item) => item.dsp_task_completion_date)
      .filter((date): date is string => date !== null && date !== undefined)
      .sort()
      .reverse()

    // Находим последнюю дату завершения передачи среди completed
    const transferDates = items
      .filter((item) => item.cl_task_workflowstepname === 'completed')
      .map((item) => item.cl_task_completion_date)
      .filter((date): date is string => date !== null && date !== undefined)
      .sort()
      .reverse()

    return {
      approvedCount,
      totalCount,
      transferredCount,
      approvalDate: approvalDates.length > 0 ? approvalDates[0] : null,
      transferDate: transferDates.length > 0 ? transferDates[0] : null,
    }
  }, [reportData])

  return {
    cardsData,
    isLoading,
  }
}
