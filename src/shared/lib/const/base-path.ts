/**
 * Базовый путь приложения
 * Должен совпадать с basePath в next.config.ts
 */
export const BASE_PATH = '/dashboards_panel'

/**
 * Формирует путь с учетом basePath
 * @param path - путь (может начинаться с / или без)
 * @returns полный путь с basePath
 */
export function getPathWithBase(path: string): string {
  // Убираем начальный слэш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Убираем завершающий слэш из basePath
  const cleanBase = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH
  return `${cleanBase}/${cleanPath}`
}

