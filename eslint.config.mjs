// eslint.config.mjs
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
    stylistic: true,
  },
}).append({
  rules: {
    // Custom rules
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
},
)
