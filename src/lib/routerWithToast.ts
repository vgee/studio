export type PushWithToast = (url: string, options?: { toastMessage?: string }) => Promise<boolean>

// attachPushWithToast: добавляет метод pushWithToast к объекту router (mutates router)
export function attachPushWithToast(router: any): any {
  if (!router.pushWithToast) {
    router.pushWithToast = (async (url: string, options?: { toastMessage?: string }) => {
      // Вызов стандартного router.push
      const res = await router.push(url)

      // Показ toast: dynamical import гарантирует, что client-only модуль не будет импортирован на сервере
      if (typeof window !== 'undefined' && options?.toastMessage) {
        try {
          const mod = await import('@/hooks/use-toast')
          // ожидание, что модуль экспортирует named `toast` или default функцию
          const toastFn = (mod && (mod.toast || mod.default)) as unknown as ((opts: { title: string }) => void) | undefined
          if (typeof toastFn === 'function') {
            toastFn({ title: options.toastMessage })
          }
        } catch (e) {
          // Если импорт не удался — молча игнорируем показ toast, не ломая навигацию
          // eslint-disable-next-line no-console
          console.warn('Failed to load toast module for pushWithToast:', e)
        }
      }

      // Поведение: если router.push вернул true/false — возвращаем как есть.
      // Если вернул undefined (void) — по выбранной политике считаем это успехом (true).
      if (res === undefined) return true
      return Boolean(res) as boolean
    }) as PushWithToast
  }
  return router
}
