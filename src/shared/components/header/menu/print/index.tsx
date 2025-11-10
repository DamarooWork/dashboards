'use client'
import { useState } from 'react'
import { Button } from '@/shared/ui'
import { Printer } from 'lucide-react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

export function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = async () => {
    try {
      setIsPrinting(true)
      const mainElement = document.querySelector('main') as HTMLElement

      if (!mainElement) {
        console.error('Элемент main не найден')
        setIsPrinting(false)
        return
      }

      // Временно изменяем цвет h1 на черный для скриншота
      const h1Elements = mainElement.querySelectorAll('h1')
      const originalColors: string[] = []

      h1Elements.forEach((h1) => {
        const h1El = h1 as HTMLElement
        originalColors.push(h1El.style.color || getComputedStyle(h1El).color)
        h1El.style.color = '#000000'
      })

      // Создаем скриншот элемента main
      const dataUrl = await toPng(mainElement, {
        backgroundColor: '#ffffff',
        quality: 1.0,
        pixelRatio: 2, // Увеличиваем качество
        cacheBust: true,
      })

      // Восстанавливаем оригинальные цвета
      h1Elements.forEach((h1, index) => {
        const h1El = h1 as HTMLElement
        if (originalColors[index]) {
          h1El.style.color = originalColors[index]
        } else {
          h1El.style.color = ''
        }
      })

      // Получаем размеры изображения
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            // Создаем PDF после загрузки изображения
            const pdf = new jsPDF({
              orientation: 'landscape',
              unit: 'mm',
              format: 'a4',
            })

            // Вычисляем размеры для A4 landscape (297x210 мм)
            const pdfWidth = 297
            const pdfHeight = 210

            // Получаем размеры изображения в пикселях
            const imgWidth = img.width
            const imgHeight = img.height

            // Вычисляем соотношение сторон
            const imgAspectRatio = imgWidth / imgHeight
            const pdfAspectRatio = pdfWidth / pdfHeight

            let scaledWidth: number
            let scaledHeight: number

            // Масштабируем изображение, чтобы оно поместилось на страницу
            if (imgAspectRatio > pdfAspectRatio) {
              // Изображение шире - масштабируем по ширине
              scaledWidth = pdfWidth
              scaledHeight = pdfWidth / imgAspectRatio
            } else {
              // Изображение выше - масштабируем по высоте
              scaledHeight = pdfHeight
              scaledWidth = pdfHeight * imgAspectRatio
            }

            // Центрируем изображение
            const xOffset = (pdfWidth - scaledWidth) / 2
            const yOffset = (pdfHeight - scaledHeight) / 2

            // Добавляем изображение в PDF
            pdf.addImage(
              dataUrl,
              'PNG',
              xOffset,
              yOffset,
              scaledWidth,
              scaledHeight
            )

            // Определяем, является ли браузер Safari
            const isSafari =
              /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
              /iPad|iPhone|iPod/.test(navigator.userAgent)

            // Открываем PDF для печати
            pdf.autoPrint()
            const pdfBlob = pdf.output('blob')
            const pdfUrl = URL.createObjectURL(pdfBlob)

            if (isSafari) {
              // Для Safari используем iframe
              const iframe = document.createElement('iframe')
              iframe.style.position = 'fixed'
              iframe.style.right = '0'
              iframe.style.bottom = '0'
              iframe.style.width = '0'
              iframe.style.height = '0'
              iframe.style.border = '0'
              iframe.src = pdfUrl
              document.body.appendChild(iframe)

              // Ждем загрузки iframe и вызываем печать
              iframe.onload = () => {
                setTimeout(() => {
                  try {
                    iframe.contentWindow?.print()
                    // Удаляем iframe после печати
                    setTimeout(() => {
                      document.body.removeChild(iframe)
                      URL.revokeObjectURL(pdfUrl)
                    }, 1000)
                  } catch (error) {
                    console.error('Ошибка при печати в Safari:', error)
                    // Если не удалось напечатать, открываем в новом окне
                    window.open(pdfUrl, '_blank')
                    document.body.removeChild(iframe)
                  }
                }, 250)
              }

              iframe.onerror = () => {
                document.body.removeChild(iframe)
                URL.revokeObjectURL(pdfUrl)
                reject(new Error('Ошибка загрузки PDF в iframe'))
              }
            } else {
              // Для других браузеров используем window.open
              const printWindow = window.open(pdfUrl, '_blank')
              if (printWindow) {
                // Используем несколько способов для надежности
                const tryPrint = () => {
                  try {
                    printWindow.print()
                    setTimeout(() => {
                      URL.revokeObjectURL(pdfUrl)
                    }, 1000)
                  } catch (error) {
                    console.error('Ошибка при печати:', error)
                    URL.revokeObjectURL(pdfUrl)
                  }
                }

                // Пробуем сразу, если окно уже загружено
                if (printWindow.document.readyState === 'complete') {
                  setTimeout(tryPrint, 100)
                } else {
                  printWindow.onload = () => {
                    setTimeout(tryPrint, 100)
                  }
                }

                // Fallback на случай, если onload не сработает
                setTimeout(tryPrint, 500)
              } else {
                // Если popup заблокирован, скачиваем файл
                const link = document.createElement('a')
                link.href = pdfUrl
                link.download = 'print.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                setTimeout(() => {
                  URL.revokeObjectURL(pdfUrl)
                }, 1000)
              }
            }

            resolve()
          } catch (error) {
            reject(error)
          }
        }

        img.onerror = () => {
          reject(new Error('Ошибка загрузки изображения'))
        }

        img.src = dataUrl
      })

      setIsPrinting(false)
    } catch (error) {
      console.error('Ошибка при создании PDF:', error)
      setIsPrinting(false)
    }
  }

  return (
    <Button
      className="rounded-xl size-18 shadow-lg border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200 relative"
      variant="outline"
      title="Печать страницы"
      onClick={handlePrint}
      disabled={isPrinting}
    >
      <Printer className="size-10" />
    </Button>
  )
}
