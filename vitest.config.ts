import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/e2e/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        'coverage/',
        '*.config.*',
        '.nuxt/',
        'dist/',
        'public/',
        'server/',
        '**/*.d.ts',
        'playwright.config.ts',
        'eslint.config.mjs',
      ],
      include: [
        'components/**/*.vue',
        'pages/**/*.vue',
        'composables/**/*.ts',
        'utils/**/*.ts',
        'types/**/*.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
  },
})
