import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        alias: '/home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/cv',
        name: 'CV',
        component: () => import('../views/CvDownload.vue')
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});
export default router;