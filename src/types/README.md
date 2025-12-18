Документация по локальным типам (src/types)

Назначение
- Хранить локальные declaration files ("augmentations") для расширения типов библиотек без правки node_modules.
- Здесь добавляются типовые расширения для Next.js и других библиотек, которые используются в проекте.

Правила и рекомендации
1. Не редактируйте файлы в `node_modules` — используйте module augmentation.
2. Чтобы augmentation подхватился TypeScript, убедитесь что папка `src/types` включена в `tsconfig.json` (поле `include`).
3. Всегда добавляйте `export {}` в конце `.d.ts` файла, если вы используете глобальные объявления или хотите, чтобы файл был модулем (это помогает избежать ошибок дублирования).
4. Если нужно расширить тип, объявленный внутри конкретного модуля (например Next.js), используйте точно такое же имя модуля как в d.ts из node_modules. Пример на основе этого репозитория:

Пример: расширение `ExperimentalConfig` (Next.js)
- В этом проекте Next объявляет `ExperimentalConfig` в модуле `next/dist/server/config-shared`.
- Чтобы добавить поле `appDir` мы использовали:

```ts
// src/types/next-overrides.d.ts
import 'next'

declare module 'next' {
  interface NextConfig {
    myCustomOption?: boolean
  }
}

declare module 'next/dist/server/config-shared' {
  interface ExperimentalConfig {
    appDir?: boolean
  }
}

export {}
```

Пояснения:
- Иногда типы экспортируются из внутренних путей (как выше). Используйте точный путь (включая `dist/...`) — это гарантирует, что augmentation применится.
- Если TS всё ещё не видит расширение — проверьте `tsconfig.include` и перезапустите TypeScript language server / IDE.

Запуск проверки типов
- Локально: выполните одну из команд:

```powershell
npx tsc --noEmit
# или
npm run typecheck
```

CI
- Рекомендуется запускать `npm run typecheck` в CI перед сборкой.

Как найти правильный модуль для augmentation
1. Откройте файл d.ts в `node_modules` который содержит интересующий тип. Например:

```powershell
# пример пути вашего проекта
explorer "node_modules\next\dist\server\config-shared.d.ts"
```

2. Посмотрите, в каком модуле объявлен интерфейс (обычно верхняя часть файла или export-имя). Используйте точно такое же имя модуля в `declare module '...'`.

Краткий troubleshooting
- "augmentation не применяется": проверьте `tsconfig.json` (поле `include`) — папка с вашими `.d.ts` должна быть в списке.
- "Duplicate identifier" или ошибки глобальных деклараций: добавьте `export {}` в конец `.d.ts` или переведите объявления в `declare module '...'`.
- "Type X not found": возможно у вас другая версия библиотеки с отличающейся структурой типов — проверьте реальные `.d.ts` в `node_modules` и используйте корректный путь.

Hook: usePushWithToast
- Расположение: `src/hooks/use-push-with-toast.ts`
- Что делает: привязывает runtime-метод `pushWithToast` к роутеру приложения (app-router) и возвращает router.
- Тип: client-only hook (должен использоваться в компонентах с директивой `"use client"`).
- Примечание: метод `pushWithToast` реализован через `attachPushWithToast` и использует локальную утилиту `toast` (из `src/hooks/use-toast`) для показа уведомления после навигации.

Пример использования
```tsx
// В компоненте (client)
"use client"
import usePushWithToast from '@/hooks/use-push-with-toast'

export default function Example() {
  const router = usePushWithToast()

  const onClick = async () => {
    await router.pushWithToast?.('/some-path', { toastMessage: 'Перешли' })
  }

  return <button onClick={onClick}>Go</button>
}
```

Советы и caveats
- Hook использует `next/navigation` (app router). Не используйте его внутри pages/route, если вы всё ещё применяете pages-router в проекте.
- `attachPushWithToast` мутирует объект роутера (runtime). Это ожидаемое поведение для хелпера; если вы предпочитаете неизменяемость, рассмотрите возвращаемый wrapper вместо мутации.
- Демо-компонент `PushWithToastExample` добавлен в `src/app/page.tsx` для ручного тестирования; его можно оборачивать условием `process.env.NODE_ENV === 'development'`.

Контакты
- Если нужно расширить другие внутренние типы Next.js — пришлите конкретное имя типа или строку ошибки компиляции, и я помогу корректно сделать augmentation.
