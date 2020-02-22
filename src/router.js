import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,

    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/student',
      component: () => import('./views/Student.vue'),
    },
    {
      path: '/teacher',
      component: () => import('./views/Teacher.vue'),
    },
  ],
});
