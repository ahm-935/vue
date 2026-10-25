import { createWebHistory, createRouter } from 'vue-router'


import Dashboard from './views/pages/Dashboard.vue';
import UserManage from './views/pages/user/UserManage.vue';
import ProductManage from './views/pages/product/ProductManage.vue';
import HelloWorld from './components/HelloWorld.vue';
import ProductCreate from './views/pages/product/ProductCreate.vue';
import ProductEdit from './views/pages/product/Product-Edit.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/users', component: UserManage },
  { path: '/user-create', component: HelloWorld },
  { path: '/products', component: ProductManage },
  { path: '/product-create', component: ProductCreate },
  { path: '/product-edit', component: ProductEdit },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})