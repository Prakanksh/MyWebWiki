import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Pbout.vue') 
    },
    {
      path: '/edu',
      name: 'edu',
      component: () => import('../views/Edu.vue') 
    },
    {
      path: '/settings/folders',
      name: 'settings-folders',
      component: () => import('../views/settings/Folders.vue')
    },
  ]
})

export default router
