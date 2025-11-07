import axios from 'axios'
import { setAuthValue } from './auth-value'

export type LoginRequest = {
  user: string
  password: string
}

export type LoginResponse = {
  token: {
    value: string
  }

  // могут быть дополнительные поля в ответе сервера
  [key: string]: unknown
}

/**
 * Функция login выполняется на сервере (в API route),
 * поэтому использует прямой URL к API, минуя прокси
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://82.202.128.65:8080'
  const { data } = await axios.post<LoginResponse>(
    `${apiUrl}/json/login`,
    credentials,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  if (data?.token?.value) {
    setAuthValue(data.token.value)
  }
  return data
}
