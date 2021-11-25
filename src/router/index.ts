import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "Login" */ '../views/about.vue'),
  },
  {
    path: '/blogPage',
    name: 'BlogPage',
    component: () => import(/* webpackChunkName: "Login" */ '../views/blogPage.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Login" */ '../views/contact.vue'),
  },
  {
    path: '/mySpace',
    name: 'MySpace',
    component: () => import(/* webpackChunkName: "Login" */ '../views/mySpace.vue'),
  },
  {
    path: '/blogContent',
    name: 'BlogContent',
    component: () => import(/* webpackChunkName: "Login" */ '../views/blogContent.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 显示进度条
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0) // 跳转定位到页面顶部
  NProgress.done() // 完成进度条
})

export default router
