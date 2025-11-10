'use client'

import { useMemo } from 'react'
import { usePortfolioLastTelegram, useSdCollectionStatus } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import {
  PortfolioLastTelegramItem,
  SdCollectionStatusItem,
} from '@/views/collection-id/lib/types'

export function useCardsData() {
  const { data: portfolioData, isLoading: isLoadingPortfolio } =
    usePortfolioLastTelegram()
  const { data: statusData, isLoading: isLoadingStatus } =
    useSdCollectionStatus()
  const { road, year, typeOfWork } = useFiltersStore()

  // Обработка данных portfolio_last_telegram
  const portfolioCardData = useMemo(() => {
    if (!portfolioData) {
      return {
        latestTelegramDate: null,
        daysSinceStart: null,
        plannedFinish: null,
        daysTillDeadline: null,
      }
    }

    // Фильтруем данные
    let filteredData: PortfolioLastTelegramItem[] = Array.isArray(portfolioData) ? portfolioData : []

    if (year) {
      filteredData = filteredData.filter(
        (item) => item.year.toString() === year
      )
    }

    if (road && road !== ALL_ROADS) {
      filteredData = filteredData.filter((item) => item.railway_name === road)
    }

    // Находим объект с самой поздней telegram_date (среди всех, включая null)
    // Сначала фильтруем только те, у которых есть telegram_date
    const itemsWithTelegram = filteredData.filter(
      (item) => item.telegram_date !== null
    )

    if (itemsWithTelegram.length === 0) {
      return {
        latestTelegramDate: null,
        daysSinceStart: null,
        plannedFinish: null,
        daysTillDeadline: null,
      }
    }

    // Находим объект с самой поздней датой
    const latestItem = itemsWithTelegram.reduce((latest, current) => {
      const latestDate = new Date(latest.telegram_date!)
      const currentDate = new Date(current.telegram_date!)
      return currentDate > latestDate ? current : latest
    })

    return {
      latestTelegramDate: latestItem.telegram_date,
      daysSinceStart: latestItem.days_since_tp_task_planned_start,
      plannedFinish: latestItem.tp_task_planned_finish,
      daysTillDeadline: latestItem.days_till_tp_task_deadline,
    }
  }, [portfolioData, road, year])

  // Обработка данных sd_collection_status
  const statusCardData = useMemo(() => {
    if (!statusData) {
      return {
        completedCount: 0,
        totalCount: 0,
        inworkCount: 0,
        overdueCount: 0,
      }
    }

    // Фильтруем данные
    let filteredData: SdCollectionStatusItem[] = Array.isArray(statusData) ? statusData : []

    if (year) {
      filteredData = filteredData.filter(
        (item) => item.year.toString() === year
      )
    }

    if (road && road !== ALL_ROADS) {
      filteredData = filteredData.filter((item) => item.railway_name === road)
    }

    if (typeOfWork && typeOfWork !== ALL_TYPES_OF_WORK) {
      filteredData = filteredData.filter(
        (item) => item.repairtype_name === typeOfWork
      )
    }

    // Подсчитываем статистику
    let completedCount = 0
    let inworkCount = 0
    let overdueCount = 0

    filteredData.forEach((item) => {
      if (item.status === 'completed') {
        completedCount++
      } else if (item.status === 'inwork') {
        inworkCount++
      } else if (item.status === 'overdue') {
        overdueCount++
      }
    })

    return {
      completedCount,
      totalCount: filteredData.length,
      inworkCount,
      overdueCount,
    }
  }, [statusData, road, year, typeOfWork])

  return {
    portfolioCardData,
    statusCardData,
    isLoading: isLoadingPortfolio || isLoadingStatus,
  }
}

