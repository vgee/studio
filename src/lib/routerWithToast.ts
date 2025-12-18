import { toast } from '@/hooks/use-toast'

export type PushWithToast = (url: string, options?: { toastMessage?: string }) => Promise<boolean>

// attachPushWithToast: добавляет метод pushWithToast к объекту router (mutates router)
export function attachPushWithToast(router: any): any {
  if (!router.pushWithToast) {
    router.pushWithToast = (async (url: string, options?: { toastMessage?: string }) => {
      // Вызов стандартного router.push
      const res = await router.push(url)
      // Используем проектный toast вместо alert
      if (typeof window !== 'undefined' && options?.toastMessage) {
        toast({ title: options.toastMessage })
      }
      return Boolean(res) as boolean
    }) as PushWithToast
  }
  return router
}
