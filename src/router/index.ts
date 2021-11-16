import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { name: '' },
    component: () => import(/* webpackChunkName: "Home" */ '../views/home.vue'),
  },
  {
    path: '/test',
    component: () => import('../components/test.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
