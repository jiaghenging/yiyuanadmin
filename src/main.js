import { createApp } from 'vue'
import router from './router'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import '@/assets/css/public.scss'
import '@/assets/css/elementui.scss'
import { createPinia } from 'pinia' 
const pinia = createPinia()
import locale from "element-plus/lib/locale/lang/zh-cn"; // 中文语言
import App from './App.vue'
const app = createApp(App);

app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: locale
  });
app.mount('#app')
