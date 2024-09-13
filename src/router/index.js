import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },

    {
      path: '/folder',
      name: 'folder',
      component: () => import('../views/Folder.vue'),
    },
    {
      path: '/starred',
      name: 'starred',
      component: () => import('../views/Folder.vue'),
      props: { starred:true }
    },
    {
      path: '/rescent',
      name: 'rescent',
      component: () => import('../views/Folder.vue')
    },

    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Books.vue')
    },
    {
      path: '/head',
      name: 'head',
      component: () => import('../views/Head.vue')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('../views/Tag.vue')
    },
    {
      path: '/fy',
      name: 'fy',
      component: () => import('../views/Fy.vue')
    },

    {
      path: '/sources',
      name: 'sources',
      component: () => import('../views/Sources.vue')
    },

    {
      path: '/settings/books',
      name: 'settings-books',
      component: () => import('../views/settings/Books.vue')
    },
    {
      path: '/settings/heads',
      name: 'settings-heads',
      component: () => import('../views/settings/Heads.vue')
    },
    {
      path: '/settings/tags',
      name: 'settings-tags',
      component: () => import('../views/settings/Tags.vue')
    },
    {
      path: '/settings/sources',
      name: 'settings-sources',
      component: () => import('../views/settings/Sources.vue')
    },
    {
      path: '/settings/folders',
      name: 'settings-folders',
      component: () => import('../views/settings/Folders.vue')
    },

  ]
})

export default router
