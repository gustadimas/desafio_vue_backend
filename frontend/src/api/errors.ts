import axios from 'axios'

type ApiErrorPayload = {
  message?: string | string[]
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorPayload | undefined

    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message.join(', ')
    }

    if (typeof data?.message === 'string' && data.message.length > 0) {
      return data.message
    }

    if (typeof error.message === 'string' && error.message.length > 0) {
      return error.message
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}
