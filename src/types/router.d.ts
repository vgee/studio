// src/types/router.d.ts
// Production-ready augmentation: расширяет `next/router` NextRouter helper-методом
declare module 'next/router' {
  interface NextRouter {
    pushWithToast?: (url: string, options?: { toastMessage?: string }) => Promise<boolean>
  }
}

export {}

