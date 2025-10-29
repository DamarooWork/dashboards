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
import { useUstraneniyaZamechaniyChartHook } from '@/shared/lib/hooks'
import { ustraneniyaZamechaniyOptions, zamechaniyaOptions } from '@/shared/lib/chart-options'

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
  const { chartRef, chartData } =   useUstraneniyaZamechaniyChartHook()

  return (
    <div className="w-full h-full ">
      {chartData ? (
        <Chart ref={chartRef} type="bar" options={ustraneniyaZamechaniyOptions} data={chartData} />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={ustraneniyaZamechaniyOptions}
          data={{
            labels: roads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
