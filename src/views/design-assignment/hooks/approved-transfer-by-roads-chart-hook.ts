'use client'

import { sortedRoads } from '@/shared/lib/data'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFilteredDesignSpecStatus } from './use-filtered-design-spec-status'
import { DesignSpecStatusItem } from '../lib/types'

export function ApprovedTransferByRoadsChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const { data: apiData, isLoading, isFetching } = useFilteredDesignSpecStatus()

  // Обрабатываем данные из API
  const processedData = useMemo(() => {
    if (isLoading || !apiData || !Array.isArray(apiData)) {
      return null
    }

    const items: DesignSpecStatusItem[] = apiData

    // Создаем Map для группировки данных по дорогам
    const roadStats = new Map<
      number,
      {
        total: number
        approved: number
        transferred: number
      }
    >()

    // Инициализируем все дороги с нулевыми значениями
    sortedRoads.forEach((road) => {
      roadStats.set(road.id, { total: 0, approved: 0, transferred: 0 })
    })

    // Подсчитываем статистику по дорогам
    items.forEach((item) => {
      const railwayId = item.railway_id
      if (railwayId && roadStats.has(railwayId)) {
        const stats = roadStats.get(railwayId)!
        stats.total++

        if (item.dsp_task_workflowstepname === 'completed') {
          stats.approved++
        }

        if (item.cl_task_workflowstepname === 'completed') {
          stats.transferred++
        }
      }
    })

    // Формируем массивы данных в порядке sortedRoads
    const planData: number[] = []
    const approvedMainData: number[] = []
    const approvedRemainingData: number[] = []
    const transferMainData: number[] = []
    const transferRemainingData: number[] = []

    sortedRoads.forEach((road) => {
      const stats = roadStats.get(road.id) || {
        total: 0,
        approved: 0,
        transferred: 0,
      }

      planData.push(stats.total)
      approvedMainData.push(stats.approved)
      approvedRemainingData.push(stats.total - stats.approved)
      transferMainData.push(stats.transferred)
      transferRemainingData.push(stats.total - stats.transferred)
    })

    return {
      planData,
      approvedMainData,
      approvedRemainingData,
      transferMainData,
      transferRemainingData,
    }
  }, [apiData, isLoading])

  useEffect(() => {
    if (chartRef.current && processedData) {
      const {
        planData,
        approvedMainData,
        approvedRemainingData,
        transferMainData,
        transferRemainingData,
      } = processedData

      // Вычисляем среднее значение переданных
      // const averageTransfer =
      //   transferMainData.reduce((sum, val) => sum + val, 0) /
      //   transferMainData.length

      // Вычисляем процент передачи относительно утвержденного
      // const transferPercent = roads.map((_, idx) => {
      //   const approved = approvedMainData[idx]
      //   const approvedRemainder = approvedRemainingData[idx]
      //   const totalApproved = approved + approvedRemainder // Общее утверждено
      //   const transferred = transferMainData[idx]
      //   // % передачи = (передано / общее_утверждено) * 100
      //   return totalApproved > 0
      //     ? Math.round((transferred / totalApproved) * 100)
      //     : 0
      // })

      const data = {
        labels: sortedRoads.map((road) => road.shortName),
        datasets: [
          // Утвержденное ЗП (основная часть - темно-зеленый)
          {
            label: 'Утверждено ЗП',
            data: approvedMainData,
            backgroundColor: '#10b981',
            stack: 'approved',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              bottomLeft: 0,
              bottomRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#fff',
            },
          },
          // Утвержденное ЗП (остаток - серый)
          {
            label: 'Утверждено — остаток',
            data: approvedRemainingData,
            backgroundColor: '#E5E7EB',
            stack: 'approved',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              topLeft: 0,
              topRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: true,
              align: 'right' as const,
              anchor: 'end' as const,
              offset: 6,
              font: {
                size: 24,
              },
              formatter: (_value: any, context: any) => {
                return planData[context.dataIndex]
              },
            },
          },
          // Переданное ЗП (основная часть - темно-синий)
          {
            label: 'Передано ЗП',
            data: transferMainData,
            backgroundColor: '#2563eb',
            stack: 'transferred',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              bottomLeft: 0,
              bottomRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#fff',
            },
          },
          // Переданное ЗП (остаток - серый)
          {
            label: 'Передано — остаток',
            data: transferRemainingData,
            backgroundColor: '#E5E7EB',
            stack: 'transferred',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              topLeft: 0,
              topRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: false,
            },
          },
          // Среднесетевая (передано) - синяя линия
          // {
          //   label: 'Среднесетевая (передано)',
          //   type: 'line' as const,
          //   data: roads.map(() => averageTransfer),
          //   backgroundColor: '#2563eb',
          //   borderColor: '#2563eb',
          //   borderWidth: 3,
          //   borderDash: [10, 5],
          //   tension: 0,
          //   yAxisID: 'y',
          //   order: 0,
          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 0,
          // },
          // % передачи - оранжевая линия
          // {
          //   label: '% передачи',
          //   type: 'line' as const,
          //   data: transferPercent,
          //   backgroundColor: 'oklch(0.769 0.188 70.08)',
          //   borderColor: 'oklch(0.769 0.188 70.08)',
          //   borderWidth: 3,
          //   tension: 0.4,
          //   yAxisID: 'y1',
          //   order: 0,
          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 4,
          // },
        ],
      }

      setChartData(data)
    }
  }, [processedData])

  return {
    chartRef,
    chartData,
    isFetching,
  }
}
