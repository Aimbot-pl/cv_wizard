import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        alias: '/home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/download-cv',
        name: 'CV',
        component: () => import('../views/CvDownload.vue'),
        beforeEnter: (to, from, next) => {
            if (!JSON.parse(localStorage.getItem('user'))) {
                next({name: 'Home'});
            } else {
                next();
            }
        }
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});
export default router;