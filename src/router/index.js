import { createRouter, createWebHistory } from 'vue-router';
import Exp from '../views/Exp.vue';
import Pbout from '../views/Pbout.vue';
import Edu from '../views/Edu.vue';

const routes = [
  {
    path: '/about',
    name: 'about',
    component: Pbout
  },
  {
    path: '/edu',
    name: 'edu',
    component: Edu
  },
  {
    path: '/exp',
    name: 'exp',
    component: Exp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
