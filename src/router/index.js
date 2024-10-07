import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        component: () =>
            import ('../App.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});



export default router;