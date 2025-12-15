export default defineNuxtConfig({
  compatibilityDate: '2024-12-17',
  devtools: { enabled: true },
  
  modules: ['@pinia/nuxt', '@nuxt/image'],
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  css: ['~/assets/css/main.css'],
  
  image: {
    quality: 80,
    format: ['webp']
  }
})
