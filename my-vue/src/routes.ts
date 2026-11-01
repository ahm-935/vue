import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/pages/Dashboard.vue"
import UserManage from "./views/pages/user/UserManage.vue"
import UserCreate from "./views/pages/user/UserCreate.vue";
import Error404 from "./views/pages/error/404.vue";
import Login from "./views/pages/auth/Login.vue";
import Register from "./views/pages/auth/Register.vue";
// import Login from "@/views/pages/auth/Login.vue";
// import ProductCreate from "./views/pages/product/ProductCreate.vue";
// import ProductUpdate from "./views/pages/product/ProductUpdate.vue";
// import ProductDetails from "./views/pages/product/ProductDetails.vue";

const routes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: UserManage },
    { path: '/user-create', component: UserCreate },
    // { path: '/products', component: ProductManage },
    // { path: '/products/create', component: ProductCreate },
    // { path: '/products-edit/:id', component: ProductUpdate },
    // { path: '/products/:id', component: ProductDetails },
    { path: '/login', component: Login, meta: { noLayout: true } },
    { path: '/register', component: Register, meta: { noLayout: true } },
    { path: '/:pathMatch(.*)*', component: Error404, meta: { noLayout: true } },
    { path: '/:catchAll(.*)', component: Error404, meta: { noLayout: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});