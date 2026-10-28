import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/pages/Dashboard.vue"
import ProductManage from "./views/pages/product/ProductManage.vue"
import UserManage from "./views/pages/user/UserManage.vue"
import HelloWorld from "./components/HelloWorld.vue";
import ProductCreate from "./views/pages/product/ProductCreate.vue";
import ProductUpdate from "./views/pages/product/ProductUpdate.vue";
import ProductDetails from "./views/pages/product/ProductDetails.vue";

const routes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: UserManage },
    { path: '/users-create', component: HelloWorld },
    { path: '/products', component: ProductManage },
    { path: '/products/create', component: ProductCreate },
    { path: '/products/update', component: ProductUpdate },
    { path: '/products/:id', component: ProductDetails },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});