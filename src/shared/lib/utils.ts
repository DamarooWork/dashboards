import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Функция для правильного склонения русских слов в зависимости от числа
 * @param count - количество элементов
 * @param one - форма для 1 (например: "элемент", "задача", "файл")
 * @param few - форма для 2-4 (например: "элемента", "задачи", "файла")
 * @param many - форма для 5+ (например: "элементов", "задач", "файлов")
 * @returns правильная форма слова
 *
 * @example
 * pluralize(1, 'элемент', 'элемента', 'элементов') // "1 элемент"
 * pluralize(2, 'элемент', 'элемента', 'элементов') // "2 элемента"
 * pluralize(5, 'элемент', 'элемента', 'элементов') // "5 элементов"
 * pluralize(21, 'элемент', 'элемента', 'элементов') // "21 элемент"
 */
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const absCount = Math.abs(count)
  const lastDigit = absCount % 10
  const lastTwoDigits = absCount % 100

  // Если последние две цифры от 11 до 19, используем форму "many"
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} ${many}`
  }

  // Если последняя цифра 1, используем форму "one"
  if (lastDigit === 1) {
    return `${count} ${one}`
  }

  // Если последняя цифра 2, 3 или 4, используем форму "few"
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} ${few}`
  }

  // В остальных случаях используем форму "many"
  return `${count} ${many}`
}

/**
 * Функция для получения только правильной формы слова без числа
 * @param count - количество элементов
 * @param one - форма для 1
 * @param few - форма для 2-4
 * @param many - форма для 5+
 * @returns только форма слова без числа
 *
 * @example
 * getPluralForm(1, 'элемент', 'элемента', 'элементов') // "элемент"
 * getPluralForm(2, 'элемент', 'элемента', 'элементов') // "элемента"
 */
export function getPluralForm(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const absCount = Math.abs(count)
  const lastDigit = absCount % 10
  const lastTwoDigits = absCount % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many
  }

  if (lastDigit === 1) {
    return one
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few
  }

  return many
}
