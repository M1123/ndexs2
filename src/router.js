// ---------- роутер
// импорт
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// создание экземпляра роутера
// описание путей и компонентов которые нужно отобразить, загрузка после перехода(lazyload)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/user',
    component: () => import('./views/User.vue'),
    meta: { auth: true },
  },
  ],
});

// проверка на авторизацию
// если пользователь не залогинен, то перевести на страницу логина
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('logedUser');
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
