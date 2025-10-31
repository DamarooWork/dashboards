export const approvedTransferByRoadsOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
    // y1: {
    //   type: 'linear' as const,
    //   position: 'right' as const,
    //   min: 0,
    //   max: 120,
    //   grid: {
    //     display: false,
    //   },
    //   ticks: {
    //     color: '#000',
    //     font: {
    //       size: 24,
    //     },
    //     callback: function (value: any) {
    //       if (value > 100) return ''
    //       return value + '%'
    //     },
    //   },
    // },
  },
}

