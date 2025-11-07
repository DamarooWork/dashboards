import { NextRequest, NextResponse } from 'next/server'
import { login } from '@/shared/lib/api/auth'

export async function POST(request: NextRequest) {
  try {
    const user = process.env.API_USER
    const password = process.env.API_PASSWORD

    if (!user || !password) {
      return NextResponse.json(
        { error: 'API credentials not configured' },
        { status: 500 }
      )
    }

    const response = await login({ user, password })

    // Возвращаем только токен, чтобы клиент мог его сохранить
    return NextResponse.json({ token: response.token.value })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
  }
}
