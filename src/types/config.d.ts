// src/types/config.d.ts
// Production-ready augmentation: добавляет `myCustomOption` в NextConfig
import 'next'

declare module 'next' {
  interface NextConfig {
    myCustomOption?: {
      enabled?: boolean
      featureName?: string
    }
  }
}

export {}

