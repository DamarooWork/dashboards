'use client'

import { useMemo } from 'react'
import { useDesignSpecApprReport, useDesignSpecProvReport } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'

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

  const { data: apprReportData, isLoading: isApprLoading } =
    useDesignSpecApprReport(yearNumber, railwayId)

  const { data: provReportData, isLoading: isProvLoading } =
    useDesignSpecProvReport(yearNumber, railwayId)

  const isLoading = isApprLoading || isProvLoading

  // Обработка данных из appr-report и prov-report
  const cardsData = useMemo(() => {
    // Получаем данные из appr-report (утверждение)
    const apprData = apprReportData?.contents?.[0]
    const approvedCount = apprData?.approved_quantity || 0
    const totalCount = apprData?.total_quantity || 0
    const approvalDate = apprData?.appr_planned_date || null

    // Получаем данные из prov-report (передача)
    const provData = provReportData?.contents?.[0]
    const transferredCount = provData?.approved_quantity || 0
    const transferDate = provData?.appr_planned_date || null

    return {
      approvedCount,
      totalCount,
      transferredCount,
      approvalDate,
      transferDate,
    }
  }, [apprReportData, provReportData])

  return {
    cardsData,
    isLoading,
  }
}
