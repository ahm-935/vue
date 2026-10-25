import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: 'Dashboard', auth: true } },
  { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { title: 'Profile', auth: true } },
  { path: '/users', name: 'users', component: () => import('@/views/UsersView.vue'), meta: { title: 'Users', auth: true } },
  { path: '/products', name: 'products', component: () => import('@/views/ProductsView.vue'), meta: { title: 'Products', auth: true } },
  { path: '/forms', name: 'forms', component: () => import('@/views/FormGroupView.vue'), meta: { title: 'Form Group', auth: true } },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { title: 'Sign in', layout: 'auth', guest: true } },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue'), meta: { title: 'Create account', layout: 'auth', guest: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'Not found' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.auth && !auth.isLoggedIn) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.meta.guest && auth.isLoggedIn) return { name: 'dashboard' }
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Admin'} · Nova Admin`
})

export default router
