// Router
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UserProfile from '@/components/UserProfile.vue';
import About from '@/components/About.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user-profile',  // Додаємо новий маршрут для UserProfile
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }  // Додаємо цей маршрут як захищений
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const currentUser = authStore.user;

  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    next('/home');
  } else {
    next();
  }
});

export default router;

