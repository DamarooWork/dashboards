export const renderPieLabel = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = props

  // Позиция значения в центре сектора
  const radiusValue = (innerRadius + outerRadius) / 2
  const xValue = cx + radiusValue * Math.cos(-midAngle * RADIAN)
  const yValue = cy + radiusValue * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={xValue}
      y={yValue}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-2xl translate-y-1"
    >
      {value}
    </text>
  )
}

