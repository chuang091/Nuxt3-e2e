<!-- app.vue -->
<template>
  <div id="app">
    <UApp>
    <NuxtPage />
    </UApp>
  </div>
</template>

<script setup lang="ts">
// Global app configuration
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// Set color mode preference
const colorMode = useColorMode()

// Initialize color mode from system preference
onMounted(() => {
  if (!colorMode.value) {
    colorMode.preference = 'system'
  }
})
</script>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>