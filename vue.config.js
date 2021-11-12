import { resolve as _resolve } from 'path'

export const publicPath = process.env.VUE_APP_PUBLISH_PATH
export const productionSourceMap = false
export const parallel = false
export const configureWebpack = {
  resolve: {
    alias: {
      swipervue: _resolve('./node_modules/swiper/vue/swiper-vue.js'),
    },
  },
}
