// src/types/api.d.ts
// Production-ready augmentation: добавляет поле `user` в NextApiRequest
import 'next'

declare module 'next' {
  interface NextApiRequest {
    user?: {
      id: string
      email?: string
      roles?: string[]
    }
  }
}

export {}

