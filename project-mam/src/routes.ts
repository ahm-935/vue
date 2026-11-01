import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/pages/Dashboard.vue"
import ProductManage from "./views/pages/product/ProductManage.vue"
import UserManage from "./views/pages/user/UserManage.vue"
import HelloWorld from "./components/HelloWorld.vue";
import ProductCreate from "./views/pages/product/ProductCreate.vue";
import ProductUpdate from "./views/pages/product/ProductUpdate.vue";
import ProductDetails from "./views/pages/product/ProductDetails.vue";
import Count from "./views/pages/pinia/Count.vue";
import Update from "./views/pages/pinia/Update.vue";
import Error404 from "./views/pages/error/Error404.vue";
import Login from "./views/pages/auth/Login.vue";

const routes = [
    { path: '/', component: Dashboard, name: 'Dashboard' },
    { path: '/users', component: UserManage },
    { path: '/users-create', component: HelloWorld },
    { path: '/products', component: ProductManage },
    { path: '/products/create', component: ProductCreate },
    { path: '/products-edit/:id', component: ProductUpdate },
    { path: '/products/:id', component: ProductDetails },
    { path: '/count', component: Count },
    { path: '/update-id', component: Update },
    { path: '/login', component: Login, name: 'Login', meta: { noLayout: true, requiresAuth: false } },
    { path: '/:pathMatch(.*)', component: Error404, meta: { noLayout: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});