'use client'

import { useRef, useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SpeedometerProps {
  className?: string
  value: number // величина утвержденных ЗП

  maxValue: number // величина ЗП по плану
}

export function Speedometer({ className, value, maxValue }: SpeedometerProps) {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  // Рассчитываем процент выполнения
  const percentage =
    maxValue > 0 ? Math.min(100, Math.max(0, (value / maxValue) * 100)) : 0

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      const ctx = chart.ctx

      // Создаем градиент для заполненной части
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, '#10b981') // зеленый
      gradient.addColorStop(0.5, '#3b82f6') // синий
      gradient.addColorStop(1, '#8b5cf6') // фиолетовый

      const filledValue = percentage.toFixed(0)
      const remainingValue = (100 - Number(filledValue)).toFixed(0)

      const data = {
        labels: ['Утверждено', 'Остаток'],
        datasets: [
          {
            data: [filledValue, remainingValue],
            backgroundColor: [gradient, '#e5e7eb'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            borderRadius: (context: any) => {
              const index = context.dataIndex
              const isFirst = index === 0
              const isLast = index === context.dataset.data.length - 1

              return {
                outerStart: isFirst ? 12 : 0,
                outerEnd: isLast ? 12 : 0,
                innerStart: isFirst ? 12 : 0,
                innerEnd: isLast ? 12 : 0,
              }
            },
          },
        ],
      }

      setChartData(data)
    }
  }, [value, maxValue, percentage])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            const isApproved = context.dataIndex === 0
            if (isApproved) {
              return `Утверждено: ${value} (${Math.round(percentage)}%)`
            } else {
              const remaining = maxValue - value
              return `Остаток: ${remaining} (${Math.round(100 - percentage)}%)`
            }
          },
        },
      },
    },
  }

  return (
    <section className={className}>
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Контейнер для графика */}
        <div className="w-full h-full relative">
          {chartData ? (
            <Doughnut ref={chartRef} options={options} data={chartData} />
          ) : (
            <Doughnut
              ref={chartRef}
              options={options}
              data={{
                datasets: [
                  {
                    data: [0, 100],
                    backgroundColor: ['#e5e7eb', '#e5e7eb'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270,
                    borderRadius: (context: any) => {
                      const index = context.dataIndex
                      const isFirst = index === 0
                      const isLast = index === context.dataset.data.length - 1

                      return {
                        outerStart: isFirst ? 12 : 0,
                        outerEnd: isLast ? 12 : 0,
                        innerStart: isFirst ? 12 : 0,
                        innerEnd: isLast ? 12 : 0,
                      }
                    },
                  },
                ],
              }}
            />
          )}

          {/* Центральное значение */}
          <div className="absolute inset-0 flex items-end justify-center ">
            <div className="text-center">
              <div className="text-4xl  text-foreground">
                {Math.round(percentage)}%
              </div>
              <div className="text-xl text-foreground/80 mt-1">
                {value} из {maxValue}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
