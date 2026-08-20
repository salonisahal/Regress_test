type ApiResponse<T> = { data: T }

async function request<T>(path: string, method = 'GET', body?: unknown): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth_token')
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) throw new Error('Request failed')
  return { data: await response.json() as T }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, 'POST', body),
}
