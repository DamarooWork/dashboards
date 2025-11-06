export const roadsOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 50,
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
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 20,
        },
      },
    },
    y: {
      stacked: true,

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

