'use client'

import { sortedRoads } from '@/shared/lib/data'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import datalabels from 'chartjs-plugin-datalabels'
import { Chart } from 'react-chartjs-2'
import { useRoadsChartHook } from '@/views/collection-id/hooks'
import { roadsOptions } from '@/views/collection-id/chart-options'
import { Loading, Error } from '@/shared/components'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  datalabels
)

export function ChartRoads() {
  const { chartRef, chartData, isLoading, error, refetch } = useRoadsChartHook()

  if (isLoading) {
    return <Loading className="w-1/4 h-1/4" />
  }

  if (error) {
    return <Error onRetry={() => refetch()} />
  }

  return (
    <div className="w-full h-full">
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={roadsOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={roadsOptions}
          data={{
            labels: sortedRoads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
