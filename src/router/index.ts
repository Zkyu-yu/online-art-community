import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/test',
        component: () => import('../components/test.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;