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
import { roads } from '@/shared/lib/data'
import { dashboard7ApprovedTransferByRoadsOptions } from '@/shared/lib/chart-options'
import { useDashboard7ApprovedTransferByRoadsChartHook } from '@/shared/lib/hooks'

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
  const { chartRef, chartData } =
    useDashboard7ApprovedTransferByRoadsChartHook()

  return (
    <div className="w-full h-full">
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={dashboard7ApprovedTransferByRoadsOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={dashboard7ApprovedTransferByRoadsOptions}
          data={{
            labels: roads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
