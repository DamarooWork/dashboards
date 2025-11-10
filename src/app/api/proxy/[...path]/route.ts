import { NextRequest, NextResponse } from 'next/server'

const targetIP = process.env.NEXT_PUBLIC_API_URL

/**
 * Универсальный прокси-route для проксирования API запросов
 * Аналог proxy конфигурации из Vite
 * Использование: /api/proxy/your-endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, params, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, params, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, params, 'PUT')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, params, 'PATCH')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, params, 'DELETE')
}

async function handleProxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string
) {
  try {
    // Разворачиваем Promise для params (требуется в Next.js 15+)
    const resolvedParams = await params

    // Формируем путь для проксирования
    const path =
      resolvedParams.path && resolvedParams.path.length > 0
        ? resolvedParams.path.join('/')
        : ''
    // Если путь пустой, проксируем на корень целевого сервера
    const targetUrl = path
      ? `${targetIP}/${path}${request.nextUrl.search}`
      : `${targetIP}${request.nextUrl.search}`

    // Получаем тело запроса, если есть
    let body: string | undefined
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        body = await request.text()
      } catch {
        // Если тело пустое или не может быть прочитано, оставляем undefined
      }
    }

    // Собираем заголовки для проксирования
    const headers: HeadersInit = {}

    // Копируем все заголовки из запроса клиента
    request.headers.forEach((value, key) => {
      // Исключаем только служебные заголовки, которые не должны передаваться
      const lowerKey = key.toLowerCase()
      if (
        !['host', 'connection', 'content-length', 'transfer-encoding'].includes(
          lowerKey
        )
      ) {
        // Сохраняем оригинальное имя заголовка (важно для x-auth и других кастомных заголовков)
        headers[key] = value
      }
    })

    // Передаем cookies из запроса клиента, если они есть
    const cookieHeader = request.headers.get('cookie')
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader
    }

    // Выполняем запрос к целевому серверу
    const response = await fetch(targetUrl, {
      method,
      headers,
      body: body || undefined,
    })

    // Получаем ответ
    const responseData = await response.text()

    // Создаем новый ответ
    const nextResponse = new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
    })

    // Копируем заголовки из ответа
    response.headers.forEach((value, key) => {
      // Перезаписываем cookie domain и path для работы на локальном домене
      // Аналог cookieDomainRewrite и cookiePathRewrite из Vite
      if (key.toLowerCase() === 'set-cookie') {
        const rewrittenCookie = value
          .split(';')
          .map((part) => {
            const trimmed = part.trim()
            // Перезаписываем Domain на localhost
            if (trimmed.toLowerCase().startsWith('domain=')) {
              return 'Domain=localhost'
            }
            // Перезаписываем Path на /
            if (trimmed.toLowerCase().startsWith('path=')) {
              return 'Path=/'
            }
            return trimmed
          })
          .join('; ')
        nextResponse.headers.append('Set-Cookie', rewrittenCookie)
      } else {
        nextResponse.headers.set(key, value)
      }
    })

    return nextResponse
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 })
  }
}
