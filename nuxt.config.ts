export default defineNuxtConfig({

  devServer: {
    port: 8888,
  },

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],

  postcss: {
    plugins: {
      autoprefixer: {}, // 自动添加前缀
      cssnano: {},
    },
  },

  css: ['assets/style/main.scss'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  app: {
    baseURL: '/digital-huarong-road/',
    head: {
      title: 'digital-huarong-road',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'keywords',
          content: 'digital-huarong-road',
        },
        {
          name: 'description',
          content:
            'digital-huarong-road',
        },
        {
          charset: 'utf-8',
        },
        { name: 'theme-color', content: '#FCF2E2' }, // PWA移动浏览器顶部主题颜色
      ],
      link: [
        {
          hid: 'icon',
          rel: 'icon',
          href: '/logo.svg',
        },
        // 网址规范化
        { rel: 'canonical', href: 'https://www.xxx.com' },
      ],
      script: [],
    },
  },

  compatibilityDate: '2024-08-12',
})
