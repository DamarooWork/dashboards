'use client'

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
import { useUstraneniyaZamechaniyChartHook } from '../../hooks'
import { ustraneniyaZamechaniyOptions } from '../../chart-options'
import { Loading, LoadingOverlay, Error } from '@/shared/components'

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

export function ChartUstraneniyaZamechaniy() {
  const { chartRef, chartData, isLoading, isFetching, error, refetch } =
    useUstraneniyaZamechaniyChartHook()

  if (isLoading) {
    return <Loading className="w-1/4 h-1/4" />
  }

  if (error) {
    return <Error onRetry={() => refetch()} />
  }

  return (
    <div className="w-full h-full relative">
      <LoadingOverlay isLoading={isFetching} />
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={ustraneniyaZamechaniyOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={ustraneniyaZamechaniyOptions}
          data={{
            labels: [],
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
