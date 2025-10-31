export const zamechaniyaOptions = {
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
          size: 20,
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
    // y1: {
    //   position: 'right' as const,
    //   grid: {
    //     display: false,
    //   },
    //   min: 0,
    //   max: 120,
    //   ticks: {
    //     color: '#000',
    //     font: {
    //       size: 24,
    //     },
    //     callback: function (value: any) {
    //       return value + '%'
    //     },
    //   },
    // },
  },
}
