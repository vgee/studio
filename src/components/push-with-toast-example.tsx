"use client"

import usePushWithToast from '@/hooks/use-push-with-toast'

export default function PushWithToastExample() {
  const router = usePushWithToast()

  const onClick = async () => {
    await router.pushWithToast?.('/?from=toast', { toastMessage: 'Навигация выполнена' })
  }

  return (
    <div>
      <button onClick={onClick}>Navigate with toast</button>
    </div>
  )
}
