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
import { sortedRoads } from '@/shared/lib/data'
import { approvedTransferByRoadsOptions } from '../../chart-options'
import { useApprovedTransferByRoadsChartHook } from '../../hooks'
import { LoadingOverlay } from '@/shared/components'

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

export function ApprovedTransferByRoads() {
  const { chartRef, chartData, isFetching } =
    useApprovedTransferByRoadsChartHook()

  return (
    <div className="w-full h-full relative">
      <LoadingOverlay isLoading={isFetching} />
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={approvedTransferByRoadsOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={approvedTransferByRoadsOptions}
          data={{
            labels: sortedRoads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
