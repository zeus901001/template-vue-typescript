import { RouteRecordRaw, createRouter, createWebHistory, Router } from 'vue-router';
import { useAuthStore } from '../store/auth';

/**
 * Guest routes.
 */
const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/Layouts/Auth.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                sensitive: true,
                component: () => import('../views/auth/Login.vue')
            },
            {
                path: 'register',
                name: 'register',
                sensitive: true,
                component: () => import('../views/auth/Register.vue')
            },
        ]
    },
]

/**
 * Main routes.
 */
const mainRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/Layouts/App.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                sensitive: true,
                component: () => import('../views/Dashboard.vue')
            },
            {
                path: 'account/users',
                name: 'users',
                sensitive: true,
                component: () => import('../views/Account/Users.vue'),
            },
        ]
    },

]

/**
 * Create a router.
 */
const router: Router = createRouter({
    strict: true,
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...authRoutes,
        ...mainRoutes,
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

/**
 * Set global navigation guard of a router.
 */
router.beforeEach(async to => {
    const authStore = useAuthStore()
    const publicPageNames: Array<string> = ['login', 'register']
    const authRequired: boolean = !publicPageNames.includes(to.name as string)

    if (authRequired && !authStore.userInfo)
        return { name: 'login' }
})

export default router