import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/user',
    component: () => import('./views/User.vue'),
  },
  ],
});
