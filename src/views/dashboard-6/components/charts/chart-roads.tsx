'use client'

import { roads } from '@/shared/lib/data'
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
import { useDashboard6RoadsChartHook } from '../../hooks'
import { dashboard6RoadsOptions } from '../../chart-options'

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
  const { chartRef, chartData } = useDashboard6RoadsChartHook()

  return (
    <div className="w-full h-full">
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={dashboard6RoadsOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={dashboard6RoadsOptions}
          data={{
            labels: roads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}

