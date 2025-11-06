export const ustraneniyaZamechaniyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 40,
    },
  },
  plugins: {
    title: {
      display: false,
    },
    labels: {
      display: false,
    },

    legend: {
      display: false,
    },
    datalabels: {
      display: true, // Включить отображение меток
      color: '#000', // Цвет текста метки
      font: {
        size: 24,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 16,
        },
      },
    },
    y: {
      stacked: true,
      position: 'left' as const,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 24,
        },
      },
    },
  },
}
