
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {'http-equiv': 'X-UA-Compatible', content: 'ie=edge'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { href: 'https://fonts.googleapis.com/css?family=Carter+One&display=swap', rel: 'stylesheet' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
 loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/pwa', { icon: false }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-146341787-2'
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isClient }) {
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
