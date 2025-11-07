import type { NextConfig } from 'next'

const targetIP = process.env.NEXT_PUBLIC_API_URL || 'http://82.202.128.65:8080'

const nextConfig: NextConfig = {
  // Проксирование запросов для разработки
  // В Next.js rewrites работает для SSR/SSG запросов
  // Для клиентских API запросов используйте API route /api/proxy/[...path]
  async rewrites() {
    // В режиме разработки проксируем все запросы, кроме тех что начинаются с /@/ или /api/
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          // Проксируем все пути, кроме начинающихся с /@/ или /api/
          source: '/:path((?!@|api).*)',
          destination: `${targetIP}/:path*`,
        },
      ]
    }
    return []
  },
}

export default nextConfig
