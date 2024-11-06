import type { App } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'

import baseRoutes from './routes/base'

const routes = [...baseRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
