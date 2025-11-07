'use client'

import { useMemo } from 'react'
import { useDesignSpecApprReport } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'
import { DesignSpecApprReportItem } from '../lib/types'

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

  const { data: reportData, isLoading } = useDesignSpecApprReport(
    yearNumber,
    railwayId
  )

  // Обработка данных design_spec_appr_report
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

    // API возвращает один объект с агрегированными данными
    const data: DesignSpecApprReportItem = reportData.contents[0]

    return {
      approvedCount: data.approved_quantity || 0,
      totalCount: data.total_quantity || 0,
      transferredCount: 0, // Это поле больше не используется в новой структуре
      approvalDate: data.appr_planned_date,
      transferDate: null, // Это поле больше не используется в новой структуре
    }
  }, [reportData])

  return {
    cardsData,
    isLoading,
  }
}
