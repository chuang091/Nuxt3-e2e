// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/ui', '@nuxt/test-utils', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Todo List App',
      meta: [
        {
          name: 'description',
          content: 'A simple and elegant todo list application',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-05-15',
})
