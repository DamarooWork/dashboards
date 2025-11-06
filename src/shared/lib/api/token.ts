let inMemoryToken: string | null = null

export function setApiToken(token: string | null) {
  inMemoryToken = token
}

export function getApiToken(): string | null {
  if (inMemoryToken) return inMemoryToken
  const envToken = process.env.API_TOKEN
  return envToken ?? null
}
