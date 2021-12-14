import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@fontsource/aldrich'
import '@fontsource/coda'

const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
