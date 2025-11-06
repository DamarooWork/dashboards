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
import { useRoadsChartHook } from '../../hooks'
import { roadsOptions } from '../../chart-options'

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
  const { chartRef, chartData } = useRoadsChartHook()

  return (
    <div className="w-full h-full">
      {chartData ? (
        <Chart ref={chartRef} type="bar" options={roadsOptions} data={chartData} />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={roadsOptions}
          data={{
            labels: roads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}

