import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { RequestsListPage } from '@/pages/requests-list'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/requests', name: 'requests-list', component: RequestsListPage },
  ],
})
