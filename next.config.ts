// @ts-ignore
// noinspection JSDeprecatedSymbols

import type { NextConfig } from 'next'

let nextConfig: NextConfig;
nextConfig = {
  experimental: {
    typedRoutes: false,
  },
  images: {
    domains: ['example.com', 'localhost'],
  },
  reactStrictMode: true,
  // Пример произвольной опции, для которой мы создадим augmentation типов
  // myCustomOption: true,
};

export default nextConfig
