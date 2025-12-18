// Расширения типов для Next.js

import 'next'

declare module 'next' {
  // Пример: добавим опциональное поле в NextConfig
  interface NextConfig {
    myCustomOption?: boolean
  }
}

// Также расширим точный модуль, в котором объявлен ExperimentalConfig
// чтобы добавить поле `appDir` без приведения к any в конфиге
declare module 'next/dist/server/config-shared' {
  interface ExperimentalConfig {
    appDir?: boolean
  }
}

export {}
