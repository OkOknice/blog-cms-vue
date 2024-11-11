import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home'
      },
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
    meta: {
      title: '登录',
    },
  },
]

export default routes
