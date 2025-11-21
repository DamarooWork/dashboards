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
import { useZamechaniyaChartHook } from '../../hooks'
import { zamechaniyaOptions } from '../../chart-options'
import { Loading, LoadingOverlay, Error } from '@/shared/components'
import { useBuildControlData } from '../../hooks/use-build-control-data'

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

export function ChartZamechaniya() {
  const { chartRef, chartData, isLoading, isFetching, error } =
    useZamechaniyaChartHook()
  const { refetch } = useBuildControlData()

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
          options={zamechaniyaOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={zamechaniyaOptions}
          data={{
            labels: sortedRoads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
