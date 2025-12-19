
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { attachPushWithToast } from '@/lib/routerWithToast'

// Мокаем модуль toast, который будет динамически импортироваться
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

describe('attachPushWithToast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should add pushWithToast and return true when router.push resolves true and show toast', async () => {
    const toast = (await import('@/hooks/use-toast')).toast as unknown as ReturnType<typeof vi.fn>
    const router: any = {
      push: vi.fn().mockResolvedValue(true),
    }

    const r = attachPushWithToast(router)
    const res = await r.pushWithToast('/path', { toastMessage: 'Done' })

    expect(res).toBe(true)
    expect(router.push).toHaveBeenCalledWith('/path')
    expect(toast).toHaveBeenCalledWith({ title: 'Done' })
  })

  it('should treat undefined result as success and still show toast', async () => {
    const toast = (await import('@/hooks/use-toast')).toast as unknown as ReturnType<typeof vi.fn>
    const router: any = {
      push: vi.fn().mockResolvedValue(undefined),
    }

    const r = attachPushWithToast(router)
    const res = await r.pushWithToast('/path', { toastMessage: 'Done' })

    expect(res).toBe(true)
    expect(router.push).toHaveBeenCalledWith('/path')
    expect(toast).toHaveBeenCalledWith({ title: 'Done' })
  })

  it('should propagate error when router.push throws and not call toast', async () => {
    const toast = (await import('@/hooks/use-toast')).toast as unknown as ReturnType<typeof vi.fn>
    const router: any = {
      push: vi.fn().mockRejectedValue(new Error('fail')),
    }

    const r = attachPushWithToast(router)

    await expect(r.pushWithToast('/path', { toastMessage: 'Done' })).rejects.toThrow('fail')
    expect(toast).not.toHaveBeenCalled()
  })

  it('should not call toast when toastMessage not provided', async () => {
    const toast = (await import('@/hooks/use-toast')).toast as unknown as ReturnType<typeof vi.fn>
    const router: any = {
      push: vi.fn().mockResolvedValue(true),
    }

    const r = attachPushWithToast(router)
    const res = await r.pushWithToast('/path')

    expect(res).toBe(true)
    expect(toast).not.toHaveBeenCalled()
  })
})
