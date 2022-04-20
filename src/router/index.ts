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
    component: () => import(/* webpackChunkName: "About" */ '../views/about.vue'),
  },
  {
    path: '/blogPage',
    name: 'BlogPage',
    component: () => import(/* webpackChunkName: "BlogPage" */ '../views/blogPage.vue'),
  },
  {
    path: '/mySpace',
    name: 'MySpace',
    component: () => import(/* webpackChunkName: "MySpace" */ '../views/mySpace.vue'),
  },
  {
    path: '/blogDetails',
    name: 'BlogDetails',
    component: () => import(/* webpackChunkName: "BlogDetails" */ '../views/blogDetails.vue'),
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: "SearchResult" */ '../views/searchResult.vue'),
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
