import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'example.com'],
  },
  experimental: {
    typedRoutes: false,
  },
  // Пример произвольной опции, для которой мы создадим augmentation типов
  // myCustomOption: true,
}

export default nextConfig
