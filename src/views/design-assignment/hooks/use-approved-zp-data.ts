'use client'

import { useMemo } from 'react'
import { useDesignSpecApprReport } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'
import { DesignSpecApprReportItem } from '../lib/types'

export function useApprovedZpData() {
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

  const {
    data: reportData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useDesignSpecApprReport(yearNumber, railwayId)

  // Обработка данных design_spec_appr_report
  const approvedZpData = useMemo(() => {
    if (
      !reportData?.contents ||
      !Array.isArray(reportData.contents) ||
      reportData.contents.length === 0
    ) {
      return {
        approvedQuantity: 0,
        totalQuantity: 0,
        daysTillPlannedDate: null,
        nearDeadlineQuantity: 0,
        deadlineCrossedQuantity: 0,
        prevPeriodApprovedQuantity: 0,
        weeklyIncrements: [0, 0, 0, 0, 0, 0, 0, 0],
      }
    }

    // API возвращает один объект с агрегированными данными
    const data: DesignSpecApprReportItem = reportData.contents[0]

    return {
      approvedQuantity: data.approved_quantity || 0,
      totalQuantity: data.total_quantity || 0,
      daysTillPlannedDate: data.days_till_appr_planned_date,
      nearDeadlineQuantity: data.near_deadline_quantity || 0,
      deadlineCrossedQuantity: data.deadline_crossed_quantity || 0,
      prevPeriodApprovedQuantity: data.prev_period_appr_quantity || 0,
      weeklyIncrements: [
        data.week1_incr || 0,
        data.week2_incr || 0,
        data.week3_incr || 0,
        data.week4_incr || 0,
        data.week5_incr || 0,
        data.week6_incr || 0,
        data.week7_incr || 0,
        data.week8_incr || 0,
      ],
    }
  }, [reportData])

  return {
    approvedZpData,
    isLoading,
    isFetching,
    error,
    refetch,
  }
}
