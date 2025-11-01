'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Хук для анимации изменения textContent элемента
 * @param ref - React ref элемента, содержимое которого нужно анимировать
 * @param value - Новое значение для анимации (число или строка)
 */
export function useAnimatedTextContent(
  ref: React.RefObject<HTMLElement | null>,
  value: number | string
) {
  const prevValueRef = useRef<number | string | null>(null)
  const isInitializedRef = useRef(false)

  useLayoutEffect(() => {
    // Проверяем, что ref существует
    if (!ref.current) {
      return
    }

    // Преобразуем значение в строку для сравнения
    const valueStr = String(value)

    // При первом рендере сохраняем текущее значение из DOM
    if (!isInitializedRef.current) {
      const currentTextContent = ref.current.textContent?.trim() || ''
      // Сохраняем либо значение из DOM, либо переданное значение
      prevValueRef.current = currentTextContent || value
      isInitializedRef.current = true
      return
    }

    // Получаем текущее значение из DOM (может быть изменено React или предыдущей анимацией)
    const currentTextContent = ref.current.textContent?.trim() || ''
    const prevValueStr =
      prevValueRef.current !== null ? String(prevValueRef.current) : null

    // Проверяем, изменилось ли значение (сравниваем с текущим в DOM и предыдущим)
    if (prevValueStr === valueStr && currentTextContent === valueStr) {
      return
    }

    // Получаем начальное значение для анимации
    // Используем текущее значение из DOM, если оно отличается от целевого
    const startValue =
      currentTextContent && currentTextContent !== valueStr
        ? currentTextContent
        : prevValueStr || value

    // Устанавливаем начальное значение, чтобы анимация начиналась с правильной точки
    // Это важно, так как React мог уже обновить DOM
    if (ref.current.textContent !== String(startValue)) {
      ref.current.textContent = String(startValue)
    }

    // Останавливаем предыдущую анимацию, если она еще выполняется
    gsap.killTweensOf(ref.current)

    // Сохраняем новое значение перед запуском анимации
    prevValueRef.current = value

    // Запускаем анимацию
    gsap.to(ref.current, {
      textContent: String(value),
      duration: 2,
      ease: 'power3',
      snap: { textContent: 1 },
      stagger: 1,
    })
  }, [ref, value])
}
