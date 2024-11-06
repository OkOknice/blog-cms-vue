import { createApp } from 'vue'
import App from './App.vue'

// 引入 element-plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入样式
import './assets/styles/index.scss'

import { setupStore } from './store'
import { setupRouter } from './router'

function bootstrap() {
  const app = createApp(App)

  // 使用 element-plus 组件库
  app.use(ElementPlus, {
    locale: zhCn,
  })

  // 配置 store
  setupStore(app)

  // 配置 router
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
