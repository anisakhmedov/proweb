import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useCourses } from '@/stores/courses';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: async () => {
                const store = useCourses();
                if (store.courses.length === 0) {
                    await store.fetchCourses();
                }
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/about.vue'),
        },
    ],
});
export default router;
