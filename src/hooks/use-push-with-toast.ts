"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { attachPushWithToast } from '@/lib/routerWithToast'

/**
 * usePushWithToast
 * Hook (client-side) — привязывает runtime-метод `pushWithToast` к роутеру
 * и возвращает объект роутера. Метод `pushWithToast` добавляется мутирующе
 * через `attachPushWithToast` и выполняет навигацию с последующим показом toast.
 *
 * Примечание: hook должен использоваться только в компонентах с директивой
 * `"use client"` (app router). Возвращаемый тип указывается как `any` для
 * совместимости с runtime-объектом роутера из `next/navigation`.
 *
 * Пример:
 * const router = usePushWithToast()
 * await router.pushWithToast?.('/path', { toastMessage: 'Done' })
 */
export function usePushWithToast() {
  const router = useRouter()

  useEffect(() => {
    // attachPushWithToast мутирует router и добавляет метод pushWithToast
    attachPushWithToast(router as any)
  }, [router])

  return router as any
}

export default usePushWithToast
