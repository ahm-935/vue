import { createWebHistory, createRouter } from 'vue-router'

import Parent from './components/props/Parent.vue';
import Form from './components/Form.vue';
import HelloWorld from './components/HelloWorld.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/student', component: Parent },
  { path: '/form', component: Form },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})