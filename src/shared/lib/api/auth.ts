import { apiClient } from './axios'
import { setApiToken } from './token'

export type LoginRequest = {
  user: string
  password: string
}

export type LoginResponse = {
  token: string
  // могут быть дополнительные поля в ответе сервера
  [key: string]: unknown
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    '/json/login',
    credentials
  )
  if (data?.token) {
    setApiToken(data.token)
  }
  return data
}
