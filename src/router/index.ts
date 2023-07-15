import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/studentsInfo/index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/error/404.vue')
    },
    {
      path: '/403',
      component: () => import('@/views/error/403.vue')
    }
  ]
})

export default router
